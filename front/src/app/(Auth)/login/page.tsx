"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [sign, setSign] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const changeMode = () => {
    setSign(!sign);
    setError("");
    setMessage("");
    reset();
  };
  const onSubmit = async (data) => {
    setError("");
    setMessage("");

    const url = sign ? "/api/auth/register" : "/api/auth/login";
    try {
      const response = await axios.post(url, data);
      setMessage(sign ? "ورود موفقیت آمیز بود" : "ثبت نام موفقیت آمیز بود!");
    } catch (error) {
      setError(error.response?.data?.message || "مشکلی پیش آمده");
    }
  };

  useEffect(() => {
    console.log("فرم تغییر کرد ، حالت فعلی ", sign ? "ورود" : "ثبت نام ");
  },[sign]);

  return (
    <div
      className={
        "grid grid-cols-12 mt-10 m-32 h-[520px] relative shadow-xl rounded-xl overflow-hidden"
      }
    >
      {/* Left Side */}
      <div
        className={`col-span-6 bg-gradient-to-br rounded from-blue-500 to-blue-700 w-[600px] flex flex-col items-start justify-center p-10
                transition-transform duration-700 ease-in-out 
                ${sign ? "translate-x-full" : "translate-x-0"} 
                absolute left-0 top-0 h-full text-white`}
      >
        <div className={"text-[50px] font-bold mb-5"}>
          <p>خوش آمدید!</p>
        </div>
        <p className="text-lg">برای شروع لطفاً وارد حساب کاربری خود شوید.</p>
        <div className={"mt-64"}>
          <button
            onClick={changeMode}
            className={
              "bg-amber-50 ps-4 pl-4 py-2 rounded-lg text-[30px] text-blue-700 shadow-lg hover:bg-amber-100 transition duration-300"
            }
          >
            {sign ? "ورود" : "ثبت نام"}
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div
        className={`rounded col-span-6 bg-gradient-to-br from-amber-50 to-amber-100 w-[600px] flex flex-col items-center justify-center
                transition-transform duration-700 ease-in-out 
                ${sign ? "-translate-x-full" : "translate-x-0"} 
                absolute right-0 top-0 h-full text-blue-700`}
      >
        <p className={"text-[50px] font-bold mb-5"}>
          {sign ? "ثبت نام" : "ورود"}
        </p>
        <div className="text-center">
          <p className="text-lg mb-4">
            {sign
              ? "فرم ثبت نام خود را پر کنید"
              : "لطفاً اطلاعات ورود خود را وارد کنید"}
          </p>

          {/* Input Fields */}
          {sign ? (
            <>
              <form className="w-full mt-10 ">
                <label className="block mb-4">
                  <input
                    type="text"
                    placeholder="نام ونام خانوادگی "
                    className="w-full p-2 border-0 rounded  shadow-xl"
                  />
                </label>
                <label className="block mb-4">
                  <input
                    type="text"
                    placeholder="آدرس ایمیل "
                    className="w-full p-2 border-0 rounded  shadow-xl"
                  />
                </label>
                <label className="block mb-4">
                  <input
                    type="password"
                    placeholder="رمز عبور"
                    className="w-full p-2 border-0 rounded shadow-md"
                  />
                </label>
                <button
                  className="bg-blue-500 text-white ps-4 pl-4 py-2 rounded-lg text-[30px] shadow-lg hover:bg-blue-700 transition duration-300"
                  type="button"
                >
                  {sign ? "ثبت نام" : "ورود"}
                </button>
              </form>
            </>
          ) : (
            <>
              <form className="w-full mt-10 ">
                <label className="block mb-4">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="w-full p-2 border-0 rounded  shadow-xl"
                  />
                </label>
                <label className="block mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border-0 rounded shadow-md"
                  />
                </label>
                <button
                  className="bg-blue-500 text-white ps-4 pl-4 py-2 rounded-lg text-[30px] shadow-lg hover:bg-blue-700 transition duration-300"
                  type="button"
                >
                  {sign ? "ثبت نام" : "ورود"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
