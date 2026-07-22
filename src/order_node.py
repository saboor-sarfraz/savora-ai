from model import model
from langchain_core.messages import (
    ToolMessage,
    SystemMessage,
    HumanMessage,
    AIMessage,
)
import ast
import json
from langchain.agents import create_agent
from order_tools import (
    find_menu_item,
    add_to_cart,
    clear_cart,
    remove_item,
    update_quantity,
    place_order,
    make_cancel_order_tool,
)
from state import State
from database import SessionLocal
from order_service import OrderService
from langsmith import traceable


def _filter_chat_history(messages):
    """
    Keep only natural conversation.
    Remove:
      - ToolMessage
      - AIMessage that contains tool calls
    """
    filtered = []

    for msg in messages:
        if isinstance(msg, ToolMessage):
            continue

        if isinstance(msg, AIMessage) and getattr(msg, "tool_calls", None):
            continue

        filtered.append(msg)

    return filtered


# ---------------------------------------------------------------------------
# Build the base agent ONCE at module load time.
# The only per-request variation is the customer-specific cancel_order tool,
# so we keep a small cache keyed by customer_id to avoid re-binding on every
# turn for the same user.
# ---------------------------------------------------------------------------
_BASE_TOOLS = [
    find_menu_item,
    add_to_cart,
    clear_cart,
    remove_item,
    update_quantity,
    place_order,
]

_agent_cache: dict = {}

@traceable
def _get_order_agent(customer_id: str):
    """Return a cached agent for this customer, creating one if needed."""
    if customer_id not in _agent_cache:
        cancel_order = make_cancel_order_tool(customer_id)
        _agent_cache[customer_id] = create_agent(
            model=model,
            tools=[*_BASE_TOOLS, cancel_order],
            system_prompt=system_prompt,
        )
    return _agent_cache[customer_id]


system_prompt = """
You are a restaurant ordering assistant.

Rules:
- If the user has not specified a quantity, assume 1.
- As soon as user makes up his/her mind add the item to cart by calling add_to_cart tool.
- After a successful add_to_cart tool call, tell the user the item was added and ask whether they'd like anything else or proceed with order placement.
- Dont show id to the users.
- Show data in tabular form.
- Do not make up menu items.

When the user asks to see their cart, answer using the cart information provided below.
Never invent items that are not in the cart.
"""


def _parse_tool_result(content) -> dict | None:
    if isinstance(content, dict):
        return content
    if not isinstance(content, str):
        return None
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        pass
    try:
        parsed = ast.literal_eval(content)
        return parsed if isinstance(parsed, dict) else None
    except (ValueError, SyntaxError):
        return None


@traceable
def order_agent_node(state: State):

    cart = state.get("cart", [])
    last_order_id = state.get("last_order_id")

    order_agent = _get_order_agent(state["customer_id"])

    dynamic_system_message = SystemMessage(
        content=f"""
            {system_prompt}

            Current cart:
            {json.dumps(cart, indent=2)}

            If the cart is empty, tell the user their cart is empty.
            """
    )

    filtered_history = _filter_chat_history(state["messages"])
    
    print("Original messages:", len(state["messages"]))
    print("Filtered messages:", len(filtered_history))
    input_messages = [
        dynamic_system_message,
        *filtered_history,
    ]

    response = order_agent.invoke({"messages": input_messages})

    # Only take the messages generated THIS turn — not the system
    # prompt / prior history we fed in, which is already in state.
    new_messages = response["messages"][len(input_messages):]

    cart = state.get("cart", []).copy()

    for message in new_messages:
        if not isinstance(message, ToolMessage):
            continue
        result = _parse_tool_result(message.content)
        if not result:
            continue

        if message.name == "add_to_cart":
            found = False
            for item in cart:
                if item["item_id"] == result["item_id"]:
                    item["quantity"] += result["quantity"]
                    found = True
                    break
            if not found:
                cart.append(result)

        elif message.name == "clear_cart":
            cart = []

        elif message.name == "remove_item":
            cart = [
                item for item in cart if item["item_id"] != result["item_id"]
            ]

        elif message.name == "update_quantity":
            for item in cart:
                if item["item_id"] == result["item_id"]:
                    if result["quantity"] <= 0:
                        cart.remove(item)
                    else:
                        item["quantity"] = result["quantity"]

        elif message.name == "place_order":
            if not cart:
                continue

            db = SessionLocal()
            try:
                service = OrderService(db)
                order_id = service.place_order(
                    customer_id=state["customer_id"],
                    cart=cart,
                )
            finally:
                db.close()

            cart = []
            last_order_id = order_id

        elif message.name == "cancel_order":
            cart = []

    return {
        "messages": new_messages,
        "cart": cart,
        "last_order_id": last_order_id,
    }