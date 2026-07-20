from typing import TypedDict, Annotated, Literal, List
from langgraph.graph.message import add_messages
from pydantic import BaseModel, Field

class State(TypedDict):
    messages: Annotated[list, add_messages]
    intent: str
    cart: List[CartItem]
    customer_id: str
    last_order_id: str | None
    
class Intent(BaseModel):
    intent: Literal["menu_inquiry","order_food"] = Field(description="Determine the user's intent. If intent doesn't fit in both categories direct it to menu_inquiry")

class CartItem(TypedDict):
    item_id: str
    name: str
    quantity: int
    unit_price: float

# class Cart(TypedDict):
#     items: list[CartItem]

