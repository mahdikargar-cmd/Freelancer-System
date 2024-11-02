const Project = require('../models/createProjectModel'); // Import the project model

class CreateProjectController {
  async createProject(req, res) {
    try {
      const userEmail = req.user?.email; // Extract user email from request

      if (!userEmail) {
        res.status(400).json({ message: 'User email is required' });
        return;
      }

      const projectData = {
        subject: req.body.subject,
        category: req.body.category,
        deadline: req.body.deadline,
        description: req.body.description,
        skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(','), // Parse skills
        range: {
          min: isNaN(parseFloat(req.body.rangeMin)) ? 0 : parseFloat(req.body.rangeMin),
          max: isNaN(parseFloat(req.body.rangeMax)) ? 0 : parseFloat(req.body.rangeMax),
        },
        file: req.file ? req.file.filename : undefined, // Handle file upload
        user: userEmail, // Add user email to project data
        role: 'employer' // Set user role as employer
      };

      const newProject = new Project(projectData); // Create a new project
      await newProject.save(); // Save the project to the database

      res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
      res.status(500).json({ message: 'Error creating project', error });
    }
  }

  async getProject(req, res) {
    try {
      const userEmail = req.user?.email; // Extract user email from request

      if (!userEmail) {
        res.status(400).json({ message: 'User email is required' });
        return;
      }

      // Find projects based on user email
      const projects = await Project.find({ user: userEmail });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching projects', error });
    }
  }

  async getProjectById(req, res) {
    try {
      const project = await Project.findById(req.params.id); // Find project by ID

      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }

      res.status(200).json(project); // Return the project
    } catch (error) {
      res.status(500).json({ message: 'Error fetching project', error });
    }
  }
}

module.exports = new CreateProjectController(); // Export the controller
