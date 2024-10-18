const Project = require('../models/createProjectModel'); // مدل پروژه خود را وارد کنید

exports.createProject = async (req, res) => {
    try {
        const projectData = {
            subject: req.body.subject,
            category: req.body.category,
            deadline: req.body.deadline,
            description: req.body.description,
            skills: req.body.skills,
            range: {
                min: parseFloat(req.body['range.min']), // تبدیل به عدد
                max: parseFloat(req.body['range.max'])  // تبدیل به عدد
            }
            // اضافه کردن سایر ویژگی‌ها به اینجا
        };

        const newProject = new Project(projectData);
        await newProject.save();

        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: 'Error creating project', error });
    }
};
