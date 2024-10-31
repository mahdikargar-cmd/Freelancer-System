import { Request, Response } from 'express';
import SuggestProjectModel from '../models/SuggestProject';
import mongoose from "mongoose";
import Project from "../models/createProjectModel";

class SuggestprojectController {
    async registerSuggestProjectController(req: Request, res: Response): Promise<void> {
        try {
            const { subject, deadline, description, price, user } = req.body;

            // بررسی صحت مقدار user
            if (!user || !mongoose.Types.ObjectId.isValid(user)) {
                res.status(400).json({ message: "Invalid or missing user ID." });
                return;
            }

            if (!subject || !deadline || !description || !price) {
                res.status(400).json({ message: "All fields are required." });
                return;
            }

            const suggestData = { subject, deadline, description, price, user };
            const newProject = new SuggestProjectModel(suggestData);
            await newProject.save();
            res.status(201).json({ message: 'Project suggestion submitted successfully', project: newProject });
        } catch (error) {
            console.error("Error in registerSuggestProjectController:", error);
            res.status(500).json({
                message: 'Error in suggestProject submission',
                error: (error as Error).message
            });
        }
    }

    async getSuggestProjectController(req: Request, res: Response): Promise<void> {
        try {
            const suggestProjects = await SuggestProjectModel.find();
            res.status(200).json({ projects: suggestProjects });
        } catch (error) {
            console.error("Error fetching project suggestions:", error);
            res.status(500).json({
                message: "Error in fetching project suggestions",
                error: (error as Error).message
            });
        }
    }


    async getSuggestProjectById(req: Request, res: Response): Promise<void> {
        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching project', error });
        }
    }
}

export default new SuggestprojectController();
