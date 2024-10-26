"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // مطمئن شو از "next/navigation" استفاده می‌کنی

export default function Login() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    const router = useRouter(); // استفاده از useRouter
    const [sign, setSign] = useState(false); // false: login, true: signup
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Change between login and signup modes
    const changeMode = () => {
        setSign(!sign);
        setError("");
        setMessage("");
        reset();
    };

    const onSubmit = async (data) => {
        setError("");
        setMessage("");

        const payload = sign
            ? { name: data.fullName, email: data.email, password: data.password, role: 'freelancer' }
            : { email: data.email, password: data.password };

        console.log(payload);
        const url = sign
            ? "http://localhost:5000/api/auth/register"
            : "http://localhost:5000/api/auth/login";

        try {
            const response = await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);
            setMessage(sign ? "ثبت نام موفقیت آمیز بود!" : "ورود موفقیت آمیز بود!");
            await router.push("/"); // به صفحه اصلی ریدایرکت کن
        } catch (error) {
            setError(error.response?.data?.message || "مشکلی پیش آمده است");
        }
    };

    useEffect(() => {
        console.log("فرم تغییر کرد ، حالت فعلی ", sign ? "ثبت نام" : "ورود");
    }, [sign]);

    return (
        <div className="grid grid-cols-12 mt-10 m-32 h-[520px] relative shadow-xl rounded-xl overflow-hidden">
            {/* Left Side */}
            <div
                className={`col-span-6 bg-gradient-to-br rounded from-blue-500 to-blue-700 w-[600px] flex flex-col items-start justify-center p-10
          transition-transform duration-700 ease-in-out 
          ${sign ? "translate-x-full" : "translate-x-0"} 
          absolute left-0 top-0 h-full text-white`}
            >
                <div className="text-[50px] font-bold mb-5">
                    <p>خوش آمدید!</p>
                </div>
                <p className="text-lg">برای شروع لطفاً وارد حساب کاربری خود شوید.</p>
                <div className="mt-64">
                    <button
                        onClick={changeMode}
                        className="bg-amber-50 ps-4 pl-4 py-2 rounded-lg text-[30px] text-blue-700 shadow-lg hover:bg-amber-100 transition duration-300"
                    >
                        {sign ? "ورود" : "ثبت نام"}
                    </button>
                </div>
            </div>
            {/* Right Side */}
            <div
                className={`col-span-6 bg-gradient-to-br from-amber-50 to-amber-100 w-[600px] flex flex-col items-center justify-center
          transition-transform duration-700 ease-in-out 
          ${sign ? "-translate-x-full" : "translate-x-0"} 
          absolute right-0 top-0 h-full text-blue-700`}
            >
                <p className="text-[50px] font-bold mb-5">
                    {sign ? "ثبت نام" : "ورود"}
                </p>
                <div className="text-center">
                    <p className="text-lg mb-4">
                        {sign
                            ? "فرم ثبت نام خود را پر کنید"
                            : "لطفاً اطلاعات ورود خود را وارد کنید"}
                    </p>

                    {/* Input Fields */}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10">
                        {sign ? (
                            <>
                                <label className="block mb-4">
                                    <input
                                        type="text"
                                        {...register("fullName", { required: true })}
                                        placeholder="نام و نام خانوادگی"
                                        className="w-full p-2 border-0 rounded  shadow-xl"
                                    />
                                    {errors.fullName && (
                                        <span className="text-red-500">
                      نام و نام خانوادگی لازم است
                    </span>
                                    )}
                                </label>
                                <label className="block mb-4">
                                    <input
                                        type="email"
                                        {...register("email", { required: "آدرس ایمیل لازم است" })}
                                        placeholder="Email Address"
                                        className="w-full p-2 border-0 rounded  shadow-xl"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500">آدرس ایمیل لازم است</span>
                                    )}
                                </label>
                                <label className="block mb-4">
                                    <input
                                        type="password"
                                        {...register("password", { required: true })}
                                        placeholder="رمز عبور"
                                        className="w-full p-2 border-0 rounded shadow-md"
                                    />
                                    {errors.password && (
                                        <span className="text-red-500">رمز عبور لازم است</span>
                                    )}
                                </label>
                            </>
                        ) : (
                            <>
                                <label className="block mb-4">
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        placeholder="آدرس ایمیل"
                                        className="w-full p-2 border-0 rounded  shadow-xl"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500">آدرس ایمیل لازم است</span>
                                    )}
                                </label>
                                <label className="block mb-4">
                                    <input
                                        type="password"
                                        {...register("password", { required: true })}
                                        placeholder="رمز عبور"
                                        className="w-full p-2 border-0 rounded shadow-md"
                                    />
                                    {errors.password && (
                                        <span className="text-red-500">رمز عبور لازم است</span>
                                    )}
                                </label>
                            </>
                        )}
                        <button
                            className="bg-blue-500 text-white ps-4 pl-4 py-2 rounded-lg text-[30px] shadow-lg hover:bg-blue-700 transition duration-300"
                            type="submit"
                        >
                            {sign ? "ثبت نام" : "ورود"}
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {message && <p className="text-green-500 mt-4">{message}</p>}
                </div>
            </div>
        </div>
    );
}
