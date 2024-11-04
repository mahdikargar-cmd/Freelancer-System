"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth} from "../../context/AuthContext";

export default function Login() {
    const { loginSuccess } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const toggleMode = () => {
        setIsSignUp((prev) => !prev);
        setError("");
        setMessage("");
        reset();
    };

    const onSubmit = async (data) => {
        setError("");
        setMessage("");

        const payload = isSignUp
            ? { name: data.fullName, email: data.email, password: data.password, role: 'freelancer' }
            : { email: data.email, password: data.password };

        const url = isSignUp
            ? "http://localhost:5000/api/auth/register"
            : "http://localhost:5000/api/auth/login";

        try {
            const response = await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            const { token, userId } = response.data;

            // Call the loginSuccess method from the context
            loginSuccess(userId);
            setMessage(isSignUp ? "ثبت نام موفقیت آمیز بود!" : "ورود موفقیت آمیز بود!");
            await router.push("/");
        } catch (error) {
            setError(error.response?.data?.message || "مشکلی پیش آمده است");
        }
    };

    useEffect(() => {
        console.log("فرم تغییر کرد ، حالت فعلی ", isSignUp ? "ثبت نام" : "ورود");
    }, [isSignUp]);

    return (
        <div className="grid grid-cols-12 mt-10 m-32 h-[520px] relative shadow-xl rounded-xl overflow-hidden">
            {/* Left Side */}
            <div className={`col-span-6 bg-gradient-to-br rounded from-blue-500 to-blue-700 w-[600px] flex flex-col items-start justify-center p-10 transition-transform duration-700 ease-in-out ${isSignUp ? "translate-x-full" : "translate-x-0"} absolute left-0 top-0 h-full text-white`}>
                <div className="text-[50px] font-bold mb-5">
                    <p>خوش آمدید!</p>
                </div>
                <p className="text-lg">برای شروع لطفاً وارد حساب کاربری خود شوید.</p>
                <div className="mt-64">
                    <button onClick={toggleMode} className="bg-amber-50 ps-4 pl-4 py-2 rounded-lg text-[30px] text-blue-700 shadow-lg hover:bg-amber-100 transition duration-300">
                        {isSignUp ? "ورود" : "ثبت نام"}
                    </button>
                </div>
            </div>
            {/* Right Side */}
            <div className={`col-span-6 bg-gradient-to-br from-amber-50 to-amber-100 w-[600px] flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${isSignUp ? "-translate-x-full" : "translate-x-0"} absolute right-0 top-0 h-full text-blue-700`}>
                <p className="text-[50px] font-bold mb-5">{isSignUp ? "ثبت نام" : "ورود"}</p>
                <div className="text-center">
                    <p className="text-lg mb-4">{isSignUp ? "فرم ثبت نام خود را پر کنید" : "لطفاً اطلاعات ورود خود را وارد کنید"}</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                        {isSignUp && (
                            <input type="text" placeholder="نام کامل" {...register("fullName", { required: "نام کامل الزامی است" })} className="border p-2 rounded-lg mb-2 w-[70%]" />
                        )}
                        <input type="email" placeholder="ایمیل" {...register("email", { required: "ایمیل الزامی است" })} className="border p-2 rounded-lg mb-2 w-[70%]" />
                        {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        <input type="password" placeholder="رمز عبور" {...register("password", { required: "رمز عبور الزامی است" })} className="border p-2 rounded-lg mb-2 w-[70%]" />
                        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        <div className="text-red-600">{error}</div>
                        <div className="text-green-600">{message}</div>
                        <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-800 transition duration-300">
                            {isSignUp ? "ثبت نام" : "ورود"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
