from flask import Flask, request, jsonify
from transformers import pipeline, AutoTokenizer
import torch
from pymongo import MongoClient
import logging
import re
from bson import ObjectId

app = Flask(__name__)

# تنظیمات لاگ
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# اتصال به MongoDB
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['freelancer'] 
    projects_collection = db['suggestprojects']  
    logger.debug("Successfully connected to MongoDB")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {str(e)}")

# تنظیمات مدل
model_id = "meta-llama/Llama-3.2-1B"
pipe = pipeline("text-generation", model=model_id, device="cpu")
tokenizer = AutoTokenizer.from_pretrained(model_id)

class AIChatAssessment:
    def __init__(self):
        self.chat_states = {}
        
    def load_project_data(self, project_id):
        """دریافت اطلاعات پروژه از MongoDB"""
        try:
            logging.debug(f"Attempting to load project with ID: {project_id}")
        
            project = projects_collection.find_one({"_id": ObjectId(project_id)})
        
            if project:
                logging.debug(f"Project loaded successfully: {project}")
            else:
                logging.debug("No project found with the given ID.")
        
            return project if project else {}
    
        except Exception as e:
            logging.error(f"Error loading project data: {e}")
            return {}

    def generate_dynamic_questions(self, project_data):
        """تولید سوالات بر اساس اطلاعات پروژه"""
        questions = []
        
        # استخراج اطلاعات کلیدی پروژه
        subject = project_data.get('subject', '')
        description = project_data.get('description', '')
        price = project_data.get('price', 0)
        deadline = project_data.get('deadline', 0)
        
        # سوالات در مورد موضوع پروژه
        questions.append(f"با توجه به موضوع پروژه '{subject}'، چگونه می‌توانید این پروژه را پیاده‌سازی کنید؟")
        
        # سوالات درباره تخصص فنی بر اساس توضیحات پروژه
        tech_keywords = self.extract_technical_keywords(description)
        if tech_keywords:
            questions.append(f"لطفاً تجربه خود را در زمینه {', '.join(tech_keywords)} توضیح دهید.")
        
        # سوالات درباره بودجه و زمان‌بندی
        if price > 0:
            questions.append(f"آیا بودجه {price} تومان برای این پروژه از نظر شما منطقی است؟ لطفاً دلیل خود را توضیح دهید.")
        
        if deadline > 0:
            questions.append(f"چگونه می‌توانید پروژه را در مدت {deadline} روز تکمیل کنید؟ برنامه زمان‌بندی خود را شرح دهید.")
        
        # سوالات ویژه برای پروژه‌های خاص
        if "فروشگاه" in description.lower():
            questions.extend([
                "چه راهکارهایی برای امنیت و پرداخت آنلاین پیشنهاد می‌کنید؟",
                "تجربه قبلی شما در پیاده‌سازی فروشگاه‌های آنلاین چیست؟"
            ])
        elif "اپلیکیشن" in description.lower():
            questions.extend([
                "استراتژی شما برای تست و کنترل کیفیت اپلیکیشن چیست؟",
                "چگونه مقیاس‌پذیری و عملکرد اپلیکیشن را تضمین می‌کنید؟"
            ])
        
        logging.debug(f"Generated questions: {questions}")
        return questions

    def extract_technical_keywords(self, text):
        """استخراج کلمات کلیدی فنی از متن"""
        keywords = set()
        common_tech_terms = [
            "React", "Node.js", "Python", "Java", "MongoDB",
            "SQL", "REST API", "Docker", "AWS", "Frontend",
            "Backend", "Full-stack", "UI/UX", "DevOps"
        ]
        
        for term in common_tech_terms:
            if term.lower() in text.lower():
                keywords.add(term)
                
        return list(keywords)

    def start_assessment(self, project_id):
        """شروع جلسه ارزیابی"""
        if project_id not in self.chat_states:
            project_data = self.load_project_data(project_id)
            questions = self.generate_dynamic_questions(project_data)
            self.chat_states[project_id] = {
                'question_count': 0,
                'questions': questions,
                'scores': [],
                'project_data': project_data
            }
        return {
            "question": self.chat_states[project_id]['questions'][0],
            "chat_state": self.chat_states[project_id]
        }

@app.route('/analyze_project', methods=['POST'])
def analyze_project():
    """شروع تحلیل پروژه"""
    data = request.get_json()
    project_id = data.get('projectId')
    
    assessor = AIChatAssessment()
    result = assessor.start_assessment(project_id)
    
    return jsonify({
        "status": "success",
        "question": result["question"],
        "chat_state": result["chat_state"]
    })

@app.route('/evaluate_answer', methods=['POST'])
def evaluate_answer():
    """ارزیابی پاسخ فریلنسر"""
    try:
        data = request.get_json()
        answer = data.get('answer')
        context = data.get('context', {})
        project_id = context.get('projectId')
        
        assessor = AIChatAssessment()
        
        if project_id not in assessor.chat_states:
            assessor.start_assessment(project_id)
            
        chat_state = assessor.chat_states[project_id]
        chat_state['question_count'] += 1
        
        project_data = assessor.load_project_data(project_id)
        
        # فرضی، می‌توانید تابع ارزیابی جواب و تعیین نمره را براساس نیازهای خود پیاده‌سازی کنید
        feedback = "پاسخ شما مفید بود. لطفاً به سوال بعدی پاسخ دهید."
        next_question = chat_state['questions'][chat_state['question_count']] if chat_state['question_count'] < len(chat_state['questions']) else None
        is_complete = chat_state['question_count'] >= len(chat_state['questions'])
        score = 10  # نمونه نمره، که می‌توانید بر اساس پاسخ‌ها تنظیم کنید
        
        return jsonify({
            "status": "success",
            "feedback": feedback,
            "next_question": next_question,
            "is_complete": is_complete,
            "score": score
        })

    except Exception as e:
        logging.error(f"Error in evaluate_answer: {str(e)}")
        return jsonify({
            "status": "error",
            "message": f"Internal server error: {str(e)}"
        }), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
