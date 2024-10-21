const Project = require('../models/createProjectModel');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const projectData = {
            subject: req.body.subject,
            category: req.body.category,
            deadline: req.body.deadline,
            description: req.body.description,
            skills: req.body.skills,
            range: {
                min: parseFloat(req.body['range.min']),
                max: parseFloat(req.body['range.max'])
            }
        };

        const newProject = new Project(projectData);
        await newProject.save();

        res.status(201).json({message: 'Project created successfully', project: newProject});
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({message: 'Error creating project', error});
    }
};

// Get all projects
exports.getProject = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({message: 'Error fetching projects', error});
    }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({message: 'Project not found'});
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({message: 'Error fetching project', error});
    }
};
