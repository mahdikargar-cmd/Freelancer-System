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
        const {}=req.body;
        try {
            const SuggestGet = await SuggestProjectModel.find({})


        } catch (error) {

        }


    }
}

export default new SuggestprojectController();
