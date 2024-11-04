const Project = require('../models/createProjectModel');

class CreateProjectController {
    async createProject(req, res) {
        try {
            const projectData = {
                subject: req.body.subject,
                category: req.body.category,
                deadline: req.body.deadline,
                description: req.body.description,
                skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(','),
                range: {
                    min: parseFloat(req.body.rangeMin) || 0,
                    max: parseFloat(req.body.rangeMax) || 0,
                },
                file: req.file ? req.file.filename : undefined,
                role: 'employer',
                user: req.user.id // اضافه کردن شناسه کاربر به داده‌های پروژه
            };
            console.log(req.user.id);
            const newProject = new Project(projectData);
            await newProject.save();

            res.status(201).json({message: 'پروژه با موفقیت ایجاد شد', project: newProject});
        } catch (error) {
            console.error('Error creating project:', error); // جزئیات خطا را چاپ کنید
            res.status(500).json({message: 'خطا در ایجاد پروژه', error}); // جزئیات خطا را در پاسخ ارسال کنید
        }
    }

    async getProject(req, res) {
        try {
            const projects = await Project.find();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({message: 'خطا در دریافت پروژه‌ها', error});
        }
    }

    async getProjectById(req, res) {
        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                res.status(404).json({message: 'پروژه یافت نشد'});
                return;
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({message: 'خطا در دریافت پروژه', error});
        }
    }
}

module.exports = new CreateProjectController();
