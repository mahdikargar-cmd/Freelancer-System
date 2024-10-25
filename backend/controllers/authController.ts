"use client";
import { Request, Response, RequestHandler } from 'express';
import User from '../models/userModel'; // مدل کاربر

class AuthController {
    // متد ثبت‌نام
    public register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password } = req.body; // دریافت اطلاعات از بدن درخواست

        try {
            const existingUser = await User.findOne({ email }); // بررسی وجود کاربر
            if (existingUser) {
                res.status(400).json({ message: 'کاربر قبلاً ثبت نام کرده است' });
                return; // جلوگیری از ادامه اجرا در صورت وجود کاربر
            }

            // ذخیره پسورد به صورت متن خام
            const user = new User({ name,email, password });
            await user.save(); // ذخیره کاربر در پایگاه داده

            res.status(201).json({
                message: 'User registered successfully',
                user: { id: user._id, name: user.name, email: user.email } // اطلاعات کاربر ثبت‌نام شده
            });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };

    // متد ورود
    public login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body; // دریافت اطلاعات از بدن درخواست

        if (!email || !password) {
            res.status(400).json({ message: 'ایمیل و رمز عبور الزامی است' });
            return;
        }

        try {
            const user = await User.findOne({ email }); // بررسی وجود کاربر
            if (!user) {
                res.status(400).json({ message: 'اطلاعات وارد شده معتبر نیست' });
                return;
            }

            // مقایسه پسوردهای خام
            if (user.password !== password) {
                res.status(401).json({ message: 'پسورد معتبر نیست' });
                return;
            }

            res.status(201).json({
                message: 'ورود موفقیت‌آمیز',
                user: { id: user._id, name: user.name, email: user.email } // اطلاعات کاربر وارد شده
            });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };
}

export default new AuthController();
