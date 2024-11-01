import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: string };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Ensure JWT_SECRET is defined
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        if (typeof decoded === 'object' && decoded.id) {
            req.user = { id: decoded.id as string }; // Attach user ID to req.user
            next();
        } else {
            res.status(401).json({ message: 'Token does not contain valid user information' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
