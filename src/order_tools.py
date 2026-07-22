from difflib import SequenceMatcher
from typing import List, Dict
from menu import MENU
from langchain_core.tools import tool
from database import SessionLocal
from order_service import OrderService
from langsmith import traceable


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


@tool
@traceable
def place_order():
    """
    Place the current cart as an order.
    Only call this after the user has confirmed the order.
    """

    return {
        "action": "place_order"
    }


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