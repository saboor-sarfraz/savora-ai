from difflib import SequenceMatcher
from typing import List, Dict, Annotated
from menu import MENU
from state import State
from langgraph.prebuilt import InjectedState
from langchain_core.tools import tool
from langgraph.types import Command
from database import SessionLocal
from order_service import OrderService

def get_menu_item_by_id(item_id: str):
    for item in MENU:
        if item["id"] == item_id:
            return item
    return None

def _similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

@tool
def find_menu_item(query: str, limit: int = 5) -> List[Dict]:
    """
    Use this tool to to confirm the user items for order from menu.
    Search the menu for items matching the user's query.
    

    The search considers:
    - Item name
    - Category
    - Description
    - Ingredients
    - Tags
    - Spice level

    Returns the top matching menu items sorted by relevance.
    """

    query = query.lower().strip()
    results = []

    for item in MENU:

        score = 0

        # Exact name match
        if query == item["name"].lower():
            score += 100

        # Partial name match
        elif query in item["name"].lower():
            score += 80

        # Category
        if query in item["category"].lower():
            score += 40

        # Tags
        if any(query in tag.lower() for tag in item["tags"]):
            score += 35

        # Ingredients
        if any(query in ing.lower() for ing in item["ingredients"]):
            score += 30

        # Spice level
        if query == item["spice_level"].lower():
            score += 25

        # Description
        if query in item["description"].lower():
            score += 20

        # Fuzzy match on item name
        similarity = _similarity(query, item["name"])

        if similarity > 0.6:
            score += int(similarity * 40)

        if score > 0:
            results.append((score, item))

    results.sort(key=lambda x: x[0], reverse=True)

    return [item for _, item in results[:limit]]



"""Cart Tools"""
@tool
def add_to_cart(
    item_id: str,
    quantity: int,
):
    """Prepare an item to be added to the cart."""

    menu_item = get_menu_item_by_id(item_id)

    if menu_item is None:
        return "Item not found."

    return {
        "item_id": menu_item["id"],
        "name": menu_item["name"],
        "quantity": quantity,
        "unit_price": menu_item["price"],
    }

@tool
def view_cart():
    """Show the current cart."""

    return {
        "action": "view_cart"
    }

@tool
def clear_cart():
    """Clear the current cart."""

    return {
        "action": "clear_cart"
    }
@tool
def remove_item(
    item_id: str,
):
    """Remove an item from the cart."""

    return {
        "action": "remove_item",
        "item_id": item_id,
    }
@tool
def update_quantity(
    item_id: str,
    quantity: int,
):
    """Update the quantity of an item in the cart."""

    return {
        "action": "update_quantity",
        "item_id": item_id,
        "quantity": quantity,
    }


# @tool
# def place_order(
#     state: Annotated[State, InjectedState],
# ):
#     """
#     Place the current cart as an order once confirmed by user.
#     """
#     #print(state)
#     cart = state["cart"]

#     if not cart:
#         return "Your cart is empty."

#     db = SessionLocal()

#     try:

#         service = OrderService(db)

#         order_id = service.place_order(
#             customer_id=state.get("customer_id"),
#             cart=cart,
#         )

#     finally:
#         db.close()

#     return Command(
#         update={
#             "cart": [],
#             "last_order_id": order_id,
#         }
#     )


@tool
def place_order():
    """
    Place the current cart as an order.
    Only call this after the user has confirmed the order.
    """

    return {
        "action": "place_order"
    }

# @tool
# def cancel_order(
#     state: Annotated[State, InjectedState],
# ):
#     """
#     Cancel the user's most recent order if it is still eligible.
#     """
#     #print(state)
#     customer_id = state.get("customer_id")

#     if not customer_id:
#         return "I couldn't identify your account, so I can't cancel an order."

#     db = SessionLocal()
#     try:
#         service = OrderService(db)
#         success, message = service.cancel_latest_order(customer_id)
#         return message
#     finally:
#         db.close()
from langchain_core.tools import tool
from database import SessionLocal
from order_service import OrderService


def make_cancel_order_tool(customer_id: str):
    @tool
    def cancel_order():
        """
        Cancel the user's most recent order if it is still eligible.
        Only call this after the user has confirmed they want to cancel.
        """
        db = SessionLocal()
        try:
            service = OrderService(db)
            _, message = service.cancel_latest_order(customer_id)
            return message
        finally:
            db.close()

    return cancel_order