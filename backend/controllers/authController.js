const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // User model
const bcrypt = require('bcryptjs');

class AuthController {
    // Register method
    async register(req, res) {
        const { name, email, password, role } = req.body; // Includes role

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'کاربر قبلاً ثبت نام کرده است' });
                return;
            }

            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword, role }); // Add role
            await user.save(); // Save user to the database

            res.status(201).json({
                message: 'کاربر با موفقیت ثبت نام شد',
                user: { id: user._id, name: user.name, email: user.email, role: user.role } // Registered user information
            });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ message: 'خطا در سرور' });
        }
    }

    // Login method
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

            // Comparing password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ message: 'پسورد معتبر نیست' });
                return;
            }

            // Creating JWT token
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({
                message: 'ورود موفقیت‌آمیز',
                token, // Sending token to client
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: 'خطا در سرور' });
        }
    }
}

module.exports = new AuthController();
