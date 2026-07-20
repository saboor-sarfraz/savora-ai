from model import model
from state import State, Intent
from langchain_core.messages import HumanMessage



prompt = """
Classify the user's message.

Return exactly one word:
- menu_inquiry
- order_food

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

def route(state:State):
    return state["intent"]