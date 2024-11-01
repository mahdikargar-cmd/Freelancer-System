// routes/someProtectedRoute.ts
import express from 'express';
import authMiddleware, { AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/protected', authMiddleware, (req: AuthRequest, res) => {
    if (req.user?.role === 'employer') {
        res.send("به پنل کارفرما خوش آمدید!");
    } else {
        res.status(403).send("این بخش مخصوص کارفرماها است.");
    }
});

export default router;
