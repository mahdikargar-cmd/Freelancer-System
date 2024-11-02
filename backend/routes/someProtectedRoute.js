const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
    if (req.user?.role === 'employer') {
        res.send("به پنل کارفرما خوش آمدید!");
    } else {
        res.status(403).send("این بخش مخصوص کارفرماها است.");
    }
});

module.exports = router;
