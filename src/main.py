from workflow import graph


from langchain_core.messages import HumanMessage

thread_id = "demo-user"

config = {
    "configurable": {
        "thread_id": thread_id
    }
}

print("Restaurant Assistant")
print("Type 'exit' to quit.\n")

while True:
    user_input = input("You: ")

    if user_input.lower() in {"exit", "quit"}:
        break

    result = graph.invoke(
        {
            "messages": [HumanMessage(content=user_input)]
        },
        config=config
    )

    print(f"Assistant: {result['messages'][-1].content}\n")