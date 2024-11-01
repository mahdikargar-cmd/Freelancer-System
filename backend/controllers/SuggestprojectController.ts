import { Request, Response } from 'express';
import mongoose from 'mongoose';
import SuggestProjectModel from '../models/SuggestProject';
import Project from '../models/createProjectModel';
import { AuthRequest } from '../middleware/authMiddleware';

class SuggestProjectController {
    async registerSuggestProjectController(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { subject, deadline, description, price } = req.body;
            const user = req.user?.id;

            if (!user || !mongoose.Types.ObjectId.isValid(user)) {
                res.status(400).json({ message: 'شناسه کاربر نامعتبر است' });
                return;
            }

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
                role: 'freelancer' // ثبت نقش به عنوان فریلنسر
            };

            const newSuggestion = new SuggestProjectModel(suggestData);
            await newSuggestion.save();

            res.status(201).json({ message: 'پیشنهاد پروژه با موفقیت ثبت شد', suggestion: newSuggestion });
        } catch (error) {
            console.error('Error in registerSuggestProject:', error);
            res.status(500).json({ message: 'خطا در ثبت پیشنهاد پروژه', error });
        }
    }


    async getSuggestProjectController(req: AuthRequest, res: Response): Promise<void> {
        try {
            const employerId = req.user?.id;
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

    async getSuggestProjectById(req: Request, res: Response): Promise<void> {
        try {
            const project = await Project.findById(req.params.id);
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

export default new SuggestProjectController();
