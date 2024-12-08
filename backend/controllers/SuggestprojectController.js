const SuggestProjectModel = require('../models/SuggestProject');
const Project = require('../models/createProjectModel');
const {askProjectQuestions} = require("../utils/ai");

class SuggestProjectController {
    async registerSuggestProjectController(req, res) {
        try {
            const { subject, deadline, description, price, projectId } = req.body;
            const user = req.user?.id;

            if (!subject || !deadline || !description || !price || !projectId) {
                return res.status(400).json({ message: 'تمامی فیلدها الزامی است' });
            }

            const suggestData = {
                subject,
                deadline,
                description,
                price,
                user,
                projectId,
                role: 'freelancer'
            };

            const newSuggestion = new SuggestProjectModel(suggestData);
            await newSuggestion.save();

            res.status(201).json({ message: 'پیشنهاد پروژه با موفقیت ثبت شد', suggestion: newSuggestion });
        } catch (error) {
            console.error('Error in registerSuggestProject:', error);
            res.status(500).json({ message: 'خطا در ثبت پیشنهاد پروژه', error });
        }
    }
    async getEmployerMessages(req, res) {
        try {
            const employerId = req.user?.id;
            if (!employerId) {
                return res.status(400).json({ message: 'شناسه کارفرما یافت نشد' });
            }

            // Get projects with population and proper error handling
            const projects = await Project.find({ user: employerId }).lean();
            if (!projects || projects.length === 0) {
                return res.status(404).json({ message: 'هیچ پروژه‌ای برای این کارفرما یافت نشد' });
            }

            const projectIds = projects.map(project => project._id);

            // Get suggestions with populated user data
            const suggestions = await SuggestProjectModel.find({
                projectId: { $in: projectIds },
                role: 'freelancer'
            })
                .populate('user', 'name email') // Add fields you want from user
                .populate('projectId', 'title description') // Add fields you want from project
                .lean();

            if (!suggestions || suggestions.length === 0) {
                return res.status(404).json({ message: 'هیچ پیشنهادی برای پروژه‌های شما یافت نشد' });
            }

            res.status(200).json({ suggestions });
        } catch (error) {
            console.error('Error fetching employer messages:', error);
            res.status(500).json({ message: 'خطا در دریافت پیام‌های کارفرما', error: error.message });
        }
    }

    async getFreelancerMessages(req, res) {
        try {
            const freelancerId = req.user?.id;
            if (!freelancerId) {
                return res.status(400).json({ message: 'شناسه فریلنسر یافت نشد' });
            }

            // Get suggestions with populated data
            const suggestions = await SuggestProjectModel.find({
                user: freelancerId,
                role: 'freelancer'
            })
                .populate('projectId', 'title description') // Add relevant project fields
                .lean();

            if (!suggestions || suggestions.length === 0) {
                return res.status(404).json({ message: 'هیچ پیشنهادی از طرف شما ثبت نشده است' });
            }

            res.status(200).json({ suggestions });
        } catch (error) {
            console.error('Error fetching freelancer messages:', error);
            res.status(500).json({ message: 'خطا در دریافت پیام‌های فریلنسر', error: error.message });
        }
    }

    async getSuggestProjectById(req, res) {
        try {
            const projectId = req.params.id;
            if (!projectId) {
                return res.status(400).json({ message: 'شناسه پروژه الزامی است' });
            }

            // Get project with populated user data
            const project = await Project.findById(projectId)
                .populate('user', 'name email')
                .lean();

            if (!project) {
                return res.status(404).json({ message: 'پروژه یافت نشد' });
            }

            // Get all suggestions for this project
            const suggestions = await SuggestProjectModel.find({ projectId })
                .populate('user', 'name email')
                .lean();

            res.status(200).json({ project, suggestions });
        } catch (error) {
            console.error('Error in getSuggestProjectById:', error);
            res.status(500).json({ message: 'خطا در دریافت پروژه', error: error.message });
        }
    }

    async getSuggestProjectController(req, res) {
        try {
            const employerId = req.user?.id;
            console.log("employer ID:", employerId);

            if (!employerId) {
                res.status(400).json({ message: 'شناسه کارفرما یافت نشد' });
                return;
            }
            // فیلتر بر اساس شناسه کارفرما و نقش فریلنسر
            const suggestProjects = await SuggestProjectModel.find({ user: employerId, role: 'freelancer' });

            if (!suggestProjects.length) {
                res.status(404).json({ message: 'پیشنهادی برای پروژه یافت نشد' });
                return;
            }

            res.status(200).json({ projects: suggestProjects });
        } catch (error) {
            console.error('Error fetching project suggestions:', error);
            res.status(500).json({ message: 'خطا در دریافت پیشنهادات پروژه', error });
        }
    }

    async getSuggestProjectById(req, res) {
        try {
            const project = await Project.findById(req.params.id);
            console.log("project is:",project)
            if (!project) {
                res.status(404).json({ message: 'پروژه یافت نشد' });
                return;
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ message: 'خطا در دریافت پروژه', error });
        }
    }

    async analyzeProject(req, res) {
        try {
            const { projectId } = req.body;

            if (!projectId) {
                return res.status(400).json({ message: 'شناسه پروژه الزامی است' });
            }

            // درخواست برای دریافت پاسخ‌ها از Flask API
            const responses = await askProjectQuestions(projectId);

            if (!responses.length) {
                return res.status(500).json({ message: 'هیچ سوالی یافت نشد' });
            }

            res.status(200).json({ responses });
        } catch (error) {
            console.error("Error in analyzeProject:", error);
            res.status(500).json({ message: 'خطا در تحلیل پروژه', error });
        }
    }
}

module.exports = new SuggestProjectController();
