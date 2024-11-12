from flask import Flask, request, jsonify
from transformers import pipeline, AutoTokenizer
import torch

app = Flask(__name__)

# Model Setup
model_id = "meta-llama/Llama-3.2-1B"
pipe = pipeline("text-generation", model=model_id, device="cpu")
tokenizer = AutoTokenizer.from_pretrained(model_id)

class AIChatAssessment:
    def __init__(self):
        self.chat_states = {}
        self.questions = [
            "لطفاً در مورد تجربیات قبلی خود در پروژه‌های مشابه فروشگاهی توضیح دهید. چه چالش‌هایی داشتید و چطور آنها را حل کردید؟",
            "چگونه امنیت سایت فروشگاهی و تراکنش‌های مالی را تضمین می‌کنید؟",
            "برای بهینه‌سازی عملکرد سایت در زمان‌های پربازدید چه راهکارهایی را پیاده‌سازی می‌کنید؟"
        ]

    def _generate_web_questions(self, context):
        prompt = f"""با توجه به توضیحات پروژه و پاسخ‌های قبلی:
        {context}
        
        یک سوال تخصصی درباره توسعه وب مطرح کنید که موارد زیر را پوشش دهد:
        - مهارت‌های فنی
        - تجربیات قبلی
        - روش‌های حل مسئله
        - بهترین شیوه‌های توسعه
        """
        response = pipe(prompt, max_length=200, truncation=True, pad_token_id=tokenizer.eos_token_id)
        print("AI raw response:", response)  # Debugging the raw response
        generated_text = response[0]['generated_text']
        print("Generated text:", generated_text)  # Print the generated text
        return generated_text.split("\n")[-1].strip()

    def _generate_mobile_questions(self, context):
        prompt = f"""با توجه به توضیحات پروژه و پاسخ‌های قبلی:
        {context}
        
        یک سوال تخصصی درباره توسعه موبایل مطرح کنید که موارد زیر را پوشش دهد:
        - تجربه توسعه نیتیو و کراس پلتفرم
        - بهینه‌سازی عملکرد
        - مدیریت حافظه و باتری
        - تست و دیباگ
        """
        response = pipe(prompt, max_length=200, truncation=True, pad_token_id=tokenizer.eos_token_id)
        print("AI raw response:", response)  # Debugging the raw response
        generated_text = response[0]['generated_text']
        print("Generated text:", generated_text)  # Print the generated text
        return generated_text.split("\n")[-1].strip()

    def _generate_default_questions(self, context):
        prompt = f"""با توجه به توضیحات پروژه و پاسخ‌های قبلی:
        {context}
        
        یک سوال مناسب برای ارزیابی توانایی‌های فریلنسر مطرح کنید که شامل:
        - مهارت‌های فنی
        - مدیریت پروژه
        - حل مسئله
        - ارتباطات و همکاری
        """
        response = pipe(prompt, max_length=200, truncation=True, pad_token_id=tokenizer.eos_token_id)
        print("AI raw response:", response)  # Debugging the raw response
        generated_text = response[0]['generated_text']
        print("Generated text:", generated_text)  # Print the generated text
        return generated_text.split("\n")[-1].strip()

    def evaluate_answer(self, answer, project_type, chat_state):
        # بررسی طول و کیفیت پاسخ
        words = answer.strip().split()
        word_count = len(words)
        
        # کلمات کلیدی برای هر حوزه تخصصی
        technical_keywords = {
            'security': ['ssl', 'jwt', 'hash', 'bcrypt', 'امنیت', 'رمزنگاری', 'authentication'],
            'performance': ['کش', 'redis', 'cdn', 'بهینه‌سازی', 'lazy loading', 'indexing'],
            'experience': ['پروژه', 'تجربه', 'پیاده‌سازی', 'توسعه', 'طراحی'],
            'database': ['mongodb', 'sql', 'دیتابیس', 'پایگاه داده', 'query'],
            'frontend': ['react', 'javascript', 'فرانت‌اند', 'ui', 'رابط کاربری'],
            'backend': ['node', 'express', 'بک‌اند', 'api', 'سرور']
        }

        # محاسبه امتیاز بر اساس معیارهای مختلف
        score = 0
        feedback = ""
        
        # 1. بررسی طول پاسخ
        if word_count < 10:
            score = 1
            feedback = "لطفاً توضیحات بیشتری ارائه دهید."
        else:
            # 2. بررسی کلمات کلیدی
            keyword_count = 0
            detected_areas = set()
            
            for area, keywords in technical_keywords.items():
                for keyword in keywords:
                    if keyword.lower() in answer.lower():
                        keyword_count += 1
                        detected_areas.add(area)
            
            # امتیازدهی بر اساس تنوع حوزه‌های تخصصی و کلمات کلیدی
            score = min(5, 2 + (len(detected_areas) * 0.5) + (keyword_count * 0.2))
            
            # تولید فیدبک متناسب با امتیاز
            if score >= 4:
                feedback = "پاسخ شما نشان‌دهنده تسلط خوب در این زمینه است. "
                if chat_state['question_count'] < len(self.questions):
                    feedback += "لطفاً به سوال بعدی نیز پاسخ دهید."
            elif score >= 3:
                feedback = "پاسخ شما خوب است، اما جزئیات بیشتری می‌تواند مفید باشد. "
            elif score >= 2:
                feedback = "لطفاً درباره تجربیات عملی خود در این زمینه توضیح بیشتری دهید."
            else:
                feedback = "به نظر می‌رسد نیاز به تجربه بیشتری در این زمینه دارید."

        # تعیین سوال بعدی
        next_question = None
        if chat_state['question_count'] < len(self.questions) and score >= 2:
            next_question = self.questions[chat_state['question_count']]

        return {
            "feedback": feedback,
            "next_question": next_question,
            "score": score,
            "is_complete": chat_state['question_count'] >= len(self.questions) or score < 2
        }
        context = chat_state.get('context', '')
        context += f"\nپاسخ فریلنسر: {answer}"
        
        evaluation_prompt = f"""با توجه به پاسخ فریلنسر:
        {answer}
        
        لطفاً این پاسخ را ارزیابی کنید و موارد زیر را مشخص کنید:
        1. میزان تسلط فنی
        2. تجربه عملی
        3. درک صحیح از نیازمندی‌ها
        4. نقاط قوت و ضعف
        """
        
        response = pipe(evaluation_prompt, max_length=300, truncation=True, pad_token_id=tokenizer.eos_token_id)
        print("AI raw evaluation response:", response)  # Debugging evaluation response
        generated_text = response[0]['generated_text']
        print("Generated evaluation text:", generated_text)  # Print the evaluation response
        
        score = self._calculate_score(generated_text, answer)
        
        # Generate feedback and next question
        feedback, next_question = "", None
        if score >= 4:
            feedback = "پاسخ شما نشان‌دهنده تسلط خوب شما در این زمینه است."
            next_question = self._get_next_question(project_type, context) if chat_state['question_count'] < 3 else None
        elif score >= 2:
            feedback = "لطفاً جزئیات بیشتری در مورد تجربیات عملی خود ارائه دهید."
            next_question = self._get_next_question(project_type, context)
        else:
            feedback = "به نظر می‌رسد نیاز به تجربه بیشتری در این زمینه دارید."

        return {
            "feedback": feedback,
            "next_question": next_question,
            "score": score,
            "is_complete": chat_state['question_count'] >= 3 or score < 2
        }

    def _calculate_score(self, evaluation, answer):
        score = 0
        if len(answer.split()) >= 50:
            score += 2
        technical_keywords = ["framework", "api", "database", "امنیت", "بهینه‌سازی", 
                              "معماری", "الگوریتم", "کدنویسی", "تست", "دیباگ"]
        for keyword in technical_keywords:
            if keyword in answer.lower():
                score += 0.5
        if "برای مثال" in answer or "به عنوان نمونه" in answer:
            score += 1
        return min(score, 5)

    def _get_next_question(self, project_type, context):
        question_generator = self.assessment_questions.get(project_type, self.assessment_questions["default"])
        return question_generator(context)

    def start_assessment(self, project_id, project_type):
        if project_id not in self.chat_states:
            self.chat_states[project_id] = {
                'question_count': 0,
                'context': '',
                'scores': []
            }
        return {
            "question": self.questions[0],
            "chat_state": self.chat_states[project_id]
        }

@app.route('/analyze_project', methods=['POST'])
def analyze_project():
    data = request.get_json()
    project_id = data.get('projectId')
    project_type = data.get('projectType', 'default')
    
    assessor = AIChatAssessment()
    result = assessor.start_assessment(project_id, project_type)
    
    return jsonify({
        "status": "success",
        "question": result["question"],
        "chat_state": result["chat_state"]
    })

# در فایل Flask، تغییرات زیر را اعمال کنید:

@app.route('/evaluate_answer', methods=['POST'])
def evaluate_answer():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400

        answer = data.get('answer')
        context = data.get('context', {})
        
        if not answer or not context:
            return jsonify({
                "status": "error",
                "message": "Missing required fields"
            }), 400

        project_type = context.get('projectType', 'default')
        project_id = context.get('projectId')
        
        if not project_id:
            return jsonify({
                "status": "error",
                "message": "Project ID is required"
            }), 400

        assessor = AIChatAssessment()
        
        # اگر وضعیت چت برای این پروژه وجود ندارد، آن را ایجاد کنید
        if project_id not in assessor.chat_states:
            assessor.start_assessment(project_id, project_type)
            
        chat_state = assessor.chat_states[project_id]
        chat_state['question_count'] += 1
        
        evaluation = assessor.evaluate_answer(answer, project_type, chat_state)
        
        return jsonify({
            "status": "success",
            "feedback": evaluation["feedback"],
            "next_question": evaluation["next_question"],
            "is_complete": evaluation["is_complete"],
            "score": evaluation["score"]
        })

    except Exception as e:
        print(f"Error in evaluate_answer: {str(e)}")  # اضافه کردن لاگ خطا
        return jsonify({
            "status": "error",
            "message": f"Internal server error: {str(e)}"
        }), 500
if __name__ == "__main__":
    app.run(port=5001, debug=True)
