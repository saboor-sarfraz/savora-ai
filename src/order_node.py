from model import model
from langchain_core.messages import ToolMessage, SystemMessage
import json
from langchain.agents import create_agent
from order_tools import (
    find_menu_item,
    add_to_cart,
    view_cart,
    clear_cart,
    remove_item,
    update_quantity,
    place_order,
    make_cancel_order_tool,
)
from state import State
from database import SessionLocal
from order_service import OrderService


system_prompt = """
You are a restaurant ordering assistant.

Rules:
- Never assume a quantity.
- If the user has not specified a quantity, ask for it.
- When the user provides a quantity, call the add_to_cart tool immediately.
- After a successful add_to_cart tool call, tell the user the item was added and ask whether they'd like anything else.

When the user asks to see their cart, answer using the cart information provided below.
Never invent items that are not in the cart.
"""


def order_agent_node(state: State):

    cart = state.get("cart", [])
    last_order_id = state.get("last_order_id")

    # Build the cancel_order tool per-request, bound to this customer
    cancel_order = make_cancel_order_tool(state["customer_id"])

    order_agent = create_agent(
        model=model,
        tools=[
            find_menu_item,
            add_to_cart,
            clear_cart,
            remove_item,
            update_quantity,
            place_order,
            cancel_order,
        ],
        system_prompt=system_prompt,
    )

    messages = [
        SystemMessage(
            content=f"""
                {system_prompt}

                Current cart:
                {json.dumps(cart, indent=2)}

                If the cart is empty, tell the user their cart is empty.
                """
        ),
        *state["messages"],
    ]

    response = order_agent.invoke({"messages": messages})

    cart = state.get("cart", []).copy()

    for message in response["messages"]:

        if not isinstance(message, ToolMessage):
            continue

        try:
            result = json.loads(message.content)
        except Exception:
            continue

        # -----------------
        # add_to_cart
        # -----------------
        if message.name == "add_to_cart":

            found = False

            for item in cart:
                if item["item_id"] == result["item_id"]:
                    item["quantity"] += result["quantity"]
                    found = True
                    break

            if not found:
                cart.append(result)

        # -----------------
        # clear_cart
        # -----------------
        elif message.name == "clear_cart":

            cart = []

        # -----------------
        # remove_item
        # -----------------
        elif message.name == "remove_item":

            cart = [
                item
                for item in cart
                if item["item_id"] != result["item_id"]
            ]

        # -----------------
        # update_quantity
        # -----------------
        elif message.name == "update_quantity":

            for item in cart:
                if item["item_id"] == result["item_id"]:

                    if result["quantity"] <= 0:
                        cart.remove(item)
                    else:
                        item["quantity"] = result["quantity"]

        # -----------------
        # place_order
        # -----------------
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

        # cancel_order needs no handling here anymore —
        # it already did its DB work and returned a real
        # message inside the tool itself, so the LLM's
        # reply already reflects the true outcome.

    return {
        "messages": response["messages"],
        "cart": cart,
        "last_order_id": last_order_id,
    }