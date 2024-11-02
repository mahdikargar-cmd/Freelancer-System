// authMiddleware.js
const jwt = require('jsonwebtoken'); // Import jwt

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === 'object' && decoded.email && decoded.id) {
            req.user = { id: decoded.id, email: decoded.email }; // Add id and email to req.user
            next();
        } else {
            res.status(401).json({ message: 'Token does not contain valid user information' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware; // Export the authMiddleware function
