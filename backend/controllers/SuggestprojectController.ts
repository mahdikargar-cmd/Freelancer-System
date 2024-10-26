import {Request, Response} from 'express';
import SuggestProjectModel from '../models/SuggestProject';

class SuggestprojectController {
    async resgisterSuggestProjectController(req: Request, res: Response): Promise<void> {
        try {
            const suggestData = {
                subject: req.body.subject,
                deadline: req.body.deadline,
                description: req.body.description,
                price: req.body.price
            };

            const newProject = new SuggestProjectModel(suggestData);
            await newProject.save();

            res.status(201).json({message: 'submitted successfully', project: newProject});
        } catch (error) {
            res.status(500).json({message: 'error in suggestProject', error});
        }
    }

    async getSuggestProjectController(req: Request, res: Response): Promise<void> {
        try {
            const suggestProjects = await SuggestProjectModel.find(); // دریافت همه پروژه‌ها بدون فیلتر خاص
            res.status(200).json({ projects: suggestProjects }); // ارسال داده‌ها با کد 200
        } catch (error) {
            res.status(500).json({ message: "Error in catch:", error });
        }
    }
}

export default new SuggestprojectController();
