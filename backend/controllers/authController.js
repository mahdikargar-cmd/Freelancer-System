const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        const { name, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'کاربر قبلاً ثبت نام کرده است' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword });
            await user.save();

            res.status(201).json({
                message: 'کاربر با موفقیت ثبت نام شد',
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'خطا در سرور' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'ایمیل و رمز عبور الزامی است' });
            return;
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ message: 'اطلاعات وارد شده معتبر نیست' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ message: 'رمز عبور معتبر نیست' });
                return;
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({
                message: 'ورود موفقیت‌آمیز',
                token,
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'خطا در سرور' });
        }
    }
}

module.exports = new AuthController();
