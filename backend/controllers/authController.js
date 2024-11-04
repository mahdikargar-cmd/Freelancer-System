const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password ) {
                return res.status(400).json({ message: 'تمامی فیلدها الزامی است' });
            }

            const newUser = new User({ name, email, password, role });
            await newUser.save();

            res.status(201).json({ message: 'کاربر با موفقیت ثبت شد' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'خطا در ثبت‌نام کاربر', error });
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

            // Generate JWT token
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY);

            res.status(200).json({
                message: 'ورود موفقیت‌آمیز',
                isLoggedIn: true,
                token,
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'خطا در سرور' });
        }
    }

    async statuss(req, res) {
        try {
            const userId = req.user.id;
            console.log("userId in status",userId)
            const user = await User.findById(userId).select('-password');
            console.log("user in statuss:",user)

            if (!user) {
                return res.status(404).json({ message: 'کاربر پیدا نشد' });
            }

            res.status(200).json({
                isLoggedIn: true,
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error('Error checking login status:', error);
            res.status(500).json({ message: 'خطا در بررسی وضعیت ورود کاربر' });
        }
    }

}

module.exports = new AuthController();
