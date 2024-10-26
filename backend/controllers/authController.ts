"use client";
import { Request, Response, RequestHandler } from 'express';
import User from '../models/userModel'; // مدل کاربر

class AuthController {
    // متد ثبت‌نام
    public register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password, role } = req.body; // شامل role

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'کاربر قبلاً ثبت نام کرده است' });
                return;
            }

            // ذخیره پسورد به صورت متن خام
            const user = new User({ name, email, password, role }); // اضافه کردن role
            await user.save(); // ذخیره کاربر در پایگاه داده

            res.status(201).json({
                message: 'User registered successfully',
                user: { id: user._id, name: user.name, email: user.email, role: user.role } // اطلاعات کاربر ثبت‌نام شده
            });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    // متد ورود
    public login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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

            // مقایسه پسورد
            if (user.password !== password) {
                res.status(401).json({ message: 'پسورد معتبر نیست' });
                return;
            }

            res.status(200).json({
                message: 'ورود موفقیت‌آمیز',
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: 'خطا در سرور' });
        }
    };
}

export default new AuthController();
