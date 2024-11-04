const SuggestProjectModel = require('../models/SuggestProject');
const Project = require('../models/createProjectModel');

class SuggestProjectController {
    async registerSuggestProjectController(req, res) {
        try {
            const { subject, deadline, description, price } = req.body;
            const user = req.user?.id;



            if (!subject || !deadline || !description || !price) {
                res.status(400).json({ message: 'تمامی فیلدها الزامی است' });
                return;
            }

            const suggestData = {
                subject,
                deadline,
                description,
                price,
                user,
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

    async getSuggestProjectController(req, res) {
        try {
            const employerId = req.user?._id;
            if (!employerId) {
                res.status(400).json({ message: 'شناسه کارفرما یافت نشد' });
                return;
            }

            const suggestProjects = await SuggestProjectModel.find({ user: employerId });
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
            const project = await Project.findById(req.params._id);
            if (!project) {
                res.status(404).json({ message: 'پروژه یافت نشد' });
                return;
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ message: 'خطا در دریافت پروژه', error });
        }
    }
}

module.exports = new SuggestProjectController();
