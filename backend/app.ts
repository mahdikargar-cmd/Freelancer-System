import express, { Request, Response, NextFunction } from 'express';
import connectDb from './config/db';
import authRoutes from './routes/authRoutes';
import createProject from './routes/createProjectRouter';
import suggestProject from './routes/suggestProjectRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
connectDb();

app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Incoming Request:", {
        body: req.body,
        file: req.file
    });
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/createProject', createProject);
app.use('/api/suggestProject', suggestProject);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
