import os
import uuid
from typing import Optional

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_core.messages import HumanMessage, ToolMessage

from workflow import graph

load_dotenv()

app = FastAPI(title="Restaurant Assistant API")

# Set FRONTEND_ORIGIN in your .env, e.g. http://localhost:3000
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SESSION_COOKIE = "savora_session_id"


# ---------------------------------------------------------------------------
# Request / response models — mirrors ChatMessage / BackendChatResponse
# from chat-context.tsx
# ---------------------------------------------------------------------------

class ChatMessageIn(BaseModel):
    id: Optional[str] = None
    role: Optional[str] = None
    content: Optional[str] = None
    timestamp: Optional[int] = None


class ChatRequest(BaseModel):
    message: str
    # The frontend sends the full local message history on every call
    # (see sendFn(trimmed, messagesRef.current) in chat-context.tsx).
    # We don't need it since LangGraph's checkpointer already tracks
    # conversation state server-side via thread_id, but we accept it
    # so the request body matches what the frontend actually sends.
    conversation: list[ChatMessageIn] = []


class ChatResponse(BaseModel):
    reply: str
    tool: Optional[str] = None
    cart: Optional[list] = None
    cartSummary: Optional[str] = None
    suggestedPrompts: Optional[list[str]] = None


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def build_cart_summary(cart: list) -> Optional[str]:
    if not cart:
        return None
    item_count = sum(item.get("quantity", 0) for item in cart)
    total = sum(
        item.get("quantity", 0) * item.get("unit_price", 0) for item in cart
    )
    plural = "item" if item_count == 1 else "items"
    return f"{item_count} {plural} \u00b7 ${total:.2f}"


def last_tool_used(messages: list) -> Optional[str]:
    for message in reversed(messages):
        if isinstance(message, ToolMessage):
            return message.name
    return None


# ---------------------------------------------------------------------------
# Endpoint
# ---------------------------------------------------------------------------

@app.post("/api/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, request: Request, response: Response):
    # Identify the browser session via a cookie so LangGraph's checkpointer
    # can persist cart / customer_id / last_order_id across turns without
    # the frontend having to manage a thread_id itself.
    session_id = request.cookies.get(SESSION_COOKIE)
    if not session_id:
        session_id = str(uuid.uuid4())
        response.set_cookie(
            key=SESSION_COOKIE,
            value=session_id,
            httponly=True,
            samesite="lax",
        )

    # NOTE: there's no real auth here yet, so we treat the session id as
    # the customer id too. Swap this for a real user lookup once you have
    # auth wired up.
    customer_id = session_id

    config = {"configurable": {"thread_id": session_id}}

    result = graph.invoke(
        {
            "messages": [HumanMessage(content=payload.message)],
            "customer_id": customer_id,
            "cart": [],
        },
        config=config,
    )

    reply = result["messages"][-1].content
    cart = result.get("cart", [])

    return ChatResponse(
        reply=reply,
        tool=last_tool_used(result["messages"]),
        cart=cart,
        cartSummary=build_cart_summary(cart),
        suggestedPrompts=None,
    )


@app.get("/health")
async def health():
    return {"status": "ok"}