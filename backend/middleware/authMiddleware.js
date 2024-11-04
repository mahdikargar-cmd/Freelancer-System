const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Authorization token missing or invalid format");
        return res.status(401).json({ message: 'توکن احراز هویت موجود نیست یا فرمت آن اشتباه است' });
    }


    const token = authHeader.split(' ')[1];
    console.log("Token to verify:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // اختصاص داده‌های توکن به درخواست جاری
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'توکن منقضی شده است' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'توکن نامعتبر است' });
        } else {
            return res.status(500).json({ message: 'خطای سرور در اعتبارسنجی توکن' });
        }
    }
};

module.exports = verifyToken;
