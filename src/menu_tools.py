from tools_schema import SearchMenuInput, SearchRecommendations
from langchain.tools import tool
import json
from menu import MENU
from typing import Optional

"""MENU AGENT"""

@tool(args_schema=SearchMenuInput)
def search_menu(
    category = None,
    query = None,
    max_price = None,
    min_price = None,
    tags = None,
    ingredients = None,
    allergens = None,
    spice_level = None,
    exclude_allergens: bool = True,
    limit: int = 5
) -> str:
    """
    Search the menu for items matching various criteria.
    
    This is the primary search tool that can handle hundreds of different
    customer queries by applying flexible filters to the menu data.
    
    Examples:
        - search_menu(category="Pizza", tags=["vegetarian"])
        - search_menu(spice_level="hot")
        - search_menu(category="Desserts", max_price=6)
        - search_menu(query="chicken", max_price=10)
        - search_menu(ingredients=["+beef"], allergens=["dairy"])
    """
    
 
    results = MENU.copy()
    
    # Filter by category
    if category:
        results = [item for item in results 
                  if category.lower() in item["category"].lower()]
    
    # Text search (name or description)
    if query:
        query_lower = query.lower()
        results = [item for item in results 
                  if query_lower in item["name"].lower() 
                  or query_lower in item["description"].lower()]
    
    # Filter by price range
    if max_price is not None:
        results = [item for item in results if item["price"] <= max_price]
    if min_price is not None:
        results = [item for item in results if item["price"] >= min_price]
    
    # Filter by tags
    if tags:
        results = [item for item in results 
                  if any(tag.lower() in [t.lower() for t in item["tags"]] 
                        for tag in tags)]
    
    # Filter by ingredients (with + and - syntax)
    if ingredients:
        include_ingredients = [ing[1:].lower() for ing in ingredients if ing.startswith('+')]
        exclude_ingredients = [ing[1:].lower() for ing in ingredients if ing.startswith('-')]
        neutral_ingredients = [ing.lower() for ing in ingredients 
                             if not ing.startswith(('+', '-'))]
        
        for item in results:
            item_ingredients = [i.lower() for i in item["ingredients"]]
            
            # Check required ingredients (with +)
            if include_ingredients:
                if not all(req in item_ingredients for req in include_ingredients):
                    continue
            
            # Check excluded ingredients (with -)
            if exclude_ingredients:
                if any(excl in item_ingredients for excl in exclude_ingredients):
                    continue
            
            # Check neutral ingredients (simple contains)
            if neutral_ingredients:
                if not any(ing in item_ingredients for ing in neutral_ingredients):
                    continue
        
        # Re-apply filtered results
        filtered_results = []
        for item in results:
            item_ingredients = [i.lower() for i in item["ingredients"]]
            include = True
            
            if include_ingredients:
                if not all(req in item_ingredients for req in include_ingredients):
                    include = False
            
            if exclude_ingredients and include:
                if any(excl in item_ingredients for excl in exclude_ingredients):
                    include = False
            
            if neutral_ingredients and include:
                if not any(ing in item_ingredients for ing in neutral_ingredients):
                    include = False
            
            if include:
                filtered_results.append(item)
        
        results = filtered_results
    
    # Filter by allergens
    if allergens:
        if exclude_allergens:
            # Exclude items containing ANY of these allergens
            results = [item for item in results 
                      if not any(a.lower() in [al.lower() for al in item["allergens"]] 
                                for a in allergens)]
        else:
            # Include only items containing ALL of these allergens
            results = [item for item in results 
                      if all(a.lower() in [al.lower() for al in item["allergens"]] 
                            for a in allergens)]
    
    # Filter by spice level
    if spice_level:
        results = [item for item in results 
                  if item["spice_level"].lower() == spice_level.lower()]
    
    # Sort results (you might want to sort by relevance, price, etc.)
    # Here we're sorting by price for consistency
    results = sorted(results, key=lambda x: x["price"])
    
    # Limit results
    results = results[:limit]
    if not results:
        return "No items found matching your criteria."
    return json.dumps(results, ensure_ascii=False)
   





@tool(args_schema=SearchRecommendations)
def recommend_items(category = None):
    """
        Recommend the restaurant's popular menu items.
    
        Use this tool when the user asks questions like:
        - What do you recommend?
        - What's your best seller?
        - What's popular?
        - Recommend a burger.
        - Suggest a pizza.
    """

    recommendations = []

    for item in MENU:

        if category and item["category"].lower() != category.lower():
            continue

        if "popular" in [tag.lower() for tag in item["tags"]]:
            recommendations.append(item)

    return recommendations