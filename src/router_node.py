from model import model
from state import State, Intent
from langchain_core.messages import HumanMessage



prompt = """
Classify the user's message.

Return exactly one word:
- menu_inquiry — menu questions, recommendations, ingredients, prices, dietary info (no cart changes)
- order_food — add/remove items, view cart, checkout, place order, change quantities, or choosing/confirming items to order

Examples:
- "recommend something spicy" → menu_inquiry
- "I'll take the firecracker wrap" → order_food
- "what's in my cart?" → order_food
- "show my cart" → order_food
- "checkout" → order_food

Do not explain.
"""


#router_model = model.with_structured_output(Intent)

def router_node(state:State):
    last_message=state["messages"][-1]
    #result = router_model.invoke([last_message])

    response = model.invoke([
        HumanMessage(content=prompt),
        last_message,
    ])
    return {"intent":response.content.strip()}

def route(state: State):
    intent = state["intent"].strip().lower()
    if "order" in intent:
        return "order_food"
    return "menu_inquiry"