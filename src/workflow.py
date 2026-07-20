from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import InMemorySaver
from state import State
from router_node import router_node, route
from menu_node import menu_agent_node
from order_node import order_agent_node


graph = StateGraph(State)
graph.add_node("router_node", router_node)
graph.add_node("menu_node", menu_agent_node)
graph.add_node("order_node", order_agent_node)

graph.add_edge(START, "router_node")
graph.add_conditional_edges("router_node", route,
                            {
                                "menu_inquiry":"menu_node",
                                "order_food":"order_node"
                            }
                            )
graph.add_edge("menu_node",END)
graph.add_edge("order_node",END)

checkpointer = InMemorySaver()
graph = graph.compile(checkpointer=checkpointer)