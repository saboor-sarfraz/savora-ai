from difflib import SequenceMatcher
from typing import List, Dict
from menu import MENU

def _similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


def find_menu_item(query: str, limit: int = 5) -> List[Dict]:
    """
    Use this tool to to confirm the user items for order.
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