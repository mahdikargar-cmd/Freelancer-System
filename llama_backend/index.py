from flask import Flask, request, jsonify
from transformers import pipeline
import torch
import json

app = Flask(__name__)

# Initialize the model
model_id = "meta-llama/Llama-3.2-1B"
pipe = pipeline("text-generation", model=model_id, torch_dtype=torch.bfloat16, device_map="auto")

# Pre-defined questions for different project categories
ASSESSMENT_QUESTIONS = {
    "web": [
        "لطفاً تجربیات قبلی خود در زمینه توسعه وب را توضیح دهید.",
        "با چه تکنولوژی‌هایی در این پروژه کار خواهید کرد؟",
        "چگونه امنیت وب‌سایت را تضمین می‌کنید؟"
    ],
    "mobile": [
        "آیا تجربه توسعه اپلیکیشن‌های مشابه را دارید؟",
        "برای تست اپلیکیشن چه استراتژی‌هایی در نظر دارید؟",
        "چگونه عملکرد اپلیکیشن را بهینه خواهید کرد؟"
    ],
    "default": [
        "لطفاً تجربیات مرتبط خود را شرح دهید.",
        "زمان‌بندی پیشنهادی شما برای اتمام پروژه چیست؟",
        "چگونه کیفیت کار را تضمین می‌کنید؟"
    ]
}

class FreelancerAssessment:
    def __init__(self):
        self.current_question_index = 0
        self.answers = []
        self.score = 0
        
    def evaluate_answer(self, answer):
        # امتیازدهی به پاسخ‌ها براساس کلمات کلیدی و طول پاسخ
        keywords = ["تجربه", "پروژه", "مهارت", "تخصص", "روش", "برنامه‌ریزی"]
        score = 0
        
        # بررسی طول پاسخ
        if len(answer.split()) > 20:
            score += 2
            
        # بررسی کلمات کلیدی
        for keyword in keywords:
            if keyword in answer.lower():
                score += 1
                
        return min(score, 5)  

@app.route('/ask_project_questions', methods=['POST'])
def ask_project_questions():
    data = request.get_json()
    project_id = data.get('projectId')
    
    # اینجا می‌توانید براساس project_id، نوع پروژه را تشخیص دهید
    project_type = "default"  # یا از دیتابیس بخوانید
    
    questions = ASSESSMENT_QUESTIONS.get(project_type, ASSESSMENT_QUESTIONS["default"])
    return jsonify({"questions": questions})

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")
    context = data.get("context", {})
    
    assessment = FreelancerAssessment()
    
    # ارزیابی پاسخ فریلنسر
    answer_score = assessment.evaluate_answer(prompt)
    assessment.score += answer_score
    
    # تولید پاسخ مناسب براساس امتیاز
    if answer_score >= 4:
        response = "پاسخ شما کامل و قانع‌کننده بود."
    elif answer_score >= 2:
        response = "لطفاً جزئیات بیشتری ارائه دهید."
    else:
        response = "لطفاً با جزئیات بیشتری توضیح دهید."
    
    # اضافه کردن سوال بعدی
    current_index = context.get("question_index", 0)
    if current_index < len(ASSESSMENT_QUESTIONS["default"]) - 1:
        next_question = ASSESSMENT_QUESTIONS["default"][current_index + 1]
        response = f"{response}\n\n{next_question}"
    else:
        # ارزیابی نهایی
        final_score = assessment.score / (len(ASSESSMENT_QUESTIONS["default"]) * 5) * 100
        if final_score >= 70:
            response = f"{response}\n\nبراساس پاسخ‌های شما، صلاحیت فنی شما برای این پروژه تأیید می‌شود."
        else:
            response = f"{response}\n\nلطفاً تجربیات و مهارت‌های بیشتری کسب کنید."
    
    return jsonify({"response": response})
    data = request.get_json()
    prompt = data.get("prompt", "")
    context = data.get("context", {})
    
    assessment = FreelancerAssessment()
    
    # ارزیابی پاسخ فریلنسر
    answer_score = assessment.evaluate_answer(prompt)
    assessment.score += answer_score
    
    # تولید پاسخ مناسب براساس امتیاز
    if answer_score >= 4:
        response = "پاسخ شما کامل و قانع‌کننده بود. "
    elif answer_score >= 2:
        response = "لطفاً جزئیات بیشتری در مورد تجربیات خود ارائه دهید. "
    else:
        response = "پاسخ شما نیاز به بهبود دارد. لطفاً با جزئیات بیشتری توضیح دهید. "
    
    # اضافه کردن سوال بعدی
    if context.get("question_index", 0) < len(ASSESSMENT_QUESTIONS["default"]) - 1:
        next_question = ASSESSMENT_QUESTIONS["default"][context.get("question_index", 0) + 1]
        response += f"\n\n{next_question}"
    else:
        # ارزیابی نهایی
        final_score = assessment.score / (len(ASSESSMENT_QUESTIONS["default"]) * 5) * 100
        if final_score >= 70:
            response += "\n\nبراساس پاسخ‌های شما، صلاحیت فنی شما برای این پروژه تأیید می‌شود."
        else:
            response += "\n\nلطفاً تجربیات و مهارت‌های بیشتری کسب کنید."
    
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=5001, debug=True)