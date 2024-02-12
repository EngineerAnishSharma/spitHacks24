import gradio as gr

def launch_gpt_j_6b_interface():
    title = "GPT-J-6B"

    examples = [
        ['The tower is 324 metres (1,063 ft) tall,'],
        ["The Moon's orbit around Earth has"],
        ["The smooth Borealis basin in the Northern Hemisphere covers 40%"]
    ]

    interface = gr.Interface.load(
        "huggingface/EleutherAI/gpt-j-6B", 
        inputs=gr.Textbox(lines=5, label="Input Text"),
        title=title, examples=examples
    )
    
    interface.launch()

# Call the function to launch the Gradio interface
launch_gpt_j_6b_interface()
