from flask import Flask, request, jsonify
import torch
from transformers import pipeline

app = Flask(__name__)

model_id = "meta-llama/Llama-3.2-1B"
pipe = pipeline("text-generation", model=model_id, torch_dtype=torch.bfloat16, device_map="auto")

@app.route('/', methods=['GET'])
def home():
    return "Flask server is running. Use the '/generate' endpoint to generate text.", 200

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")
    results = pipe(prompt, max_length=30, num_return_sequences=1, temperature=0.5, truncation=True)
    return jsonify({"response": results[0]["generated_text"].strip()})

if __name__ == "__main__":
    app.run(port=5001)
