const createProjectModel = require('../models/createProjectModel');

exports.createProject = async (req, res) => {
    try {
        const {subject, category, deadline, description, file, skills, range} = req.body;
        const Project = new createProjectModel({
            subject,
            category,
            deadline,
            description,
            file,
            skills,
            range
        });

        if (req.file) {
            Project.file = req.file.path;
        }
        await Project.save();
        res.status(201).json({message: "created successfully", Project});
    } catch (error) {
        res.status(500).json({message: "we have error to create project", error});
    }
};
