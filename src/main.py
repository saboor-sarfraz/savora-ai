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

from menu import MENU

SESSION_COOKIE = "savora_session_id"

MENU_BY_ID = {item["id"]: item for item in MENU}


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


class CartSummaryOut(BaseModel):
    itemCount: int
    subtotal: float


class ChatResponse(BaseModel):
    reply: str
    tool: Optional[str] = None
    cart: Optional[list] = None
    cartSummary: Optional[CartSummaryOut] = None
    suggestedPrompts: Optional[list[str]] = None


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def build_cart_summary(cart: list) -> Optional[CartSummaryOut]:
    if not cart:
        return None
    item_count = sum(item.get("quantity", 0) for item in cart)
    subtotal = sum(
        item.get("quantity", 0) * item.get("price", 0) for item in cart
    )
    return CartSummaryOut(itemCount=item_count, subtotal=round(subtotal, 2))


def normalize_cart_for_frontend(cart: list) -> list:
    normalized = []
    for item in cart:
        item_id = item.get("id") or item.get("item_id")
        menu_item = MENU_BY_ID.get(item_id, {})
        normalized.append(
            {
                "id": item_id,
                "name": item.get("name") or menu_item.get("name", ""),
                "price": item.get("price")
                if item.get("price") is not None
                else item.get("unit_price", menu_item.get("price", 0)),
                "image": item.get("image") or menu_item.get("image", ""),
                "category": (
                    item.get("category")
                    or menu_item.get("category", "burgers")
                ).lower(),
                "quantity": item.get("quantity", 1),
            }
        )
    return normalized


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

    # Do not pass "cart" here — it would overwrite the checkpointer's
    # persisted cart on every request and reset it to empty.
    result = graph.invoke(
        {
            "messages": [HumanMessage(content=payload.message)],
            "customer_id": customer_id,
        },
        config=config,
    )

    reply = result["messages"][-1].content
    cart = normalize_cart_for_frontend(result.get("cart") or [])

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