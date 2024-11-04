const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader",authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Authorization token missing'});
    }

    const token = authHeader.split(' ')[1];
    console.log("Token to verify:", token); // Add this for debugging
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(401).json({message: 'Invalid token'});
    }
};

module.exports = verifyToken;
