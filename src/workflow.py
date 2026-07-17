from typing import TypedDict,Annotated
from langgraph.graph.message import add_messages
from langgraph.graph import StateGraph,START
from langchain_groq import ChatGroq
from langgraph.prebuilt import ToolNode, tools_condition
from menu_tools import search_menu,recommend_items
from langchain_core.messages import SystemMessage
from langgraph.checkpoint.memory import InMemorySaver
from dotenv import load_dotenv


load_dotenv()


SYSTEM_PROMPT = """
You are a helpful restaurant assistant.
Answer questions about the menu.
Use tools whenever menu information is required.
Do not make up menu items.
"""


class State(TypedDict):
    messages: Annotated[list, add_messages]


def call_model(state: State):
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        *state["messages"],
    ]

    response = llm_with_tools.invoke(messages)
    return {"messages": [response]}


tools=[search_menu,recommend_items]
llm = ChatGroq(model="openai/gpt-oss-safeguard-20b")
llm_with_tools = llm.bind_tools(tools)

graph = StateGraph(State)
graph.add_node("chat_node", call_model)
graph.add_node("tools", ToolNode(tools))

graph.add_edge(START, "chat_node")
graph.add_conditional_edges("chat_node", tools_condition)
graph.add_edge("tools","chat_node")

checkpointer = InMemorySaver()

graph = graph.compile(checkpointer=checkpointer)