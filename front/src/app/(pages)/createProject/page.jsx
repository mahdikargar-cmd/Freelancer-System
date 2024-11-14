"use client";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateProject() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("subject", data.subject);
        formData.append("category", data.category);
        formData.append("deadline", data.deadline);
        formData.append("description", data.description);
        formData.append("skills", data.skills.split(","));
        formData.append("rangeMin", data.rangeMin);
        formData.append("rangeMax", data.rangeMax);

        if (data.file && data.file[0]) {
            formData.append("file", data.file[0]);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:5000/api/createProject/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Project created successfully:", response.data);
            alert("با موفقیت ثبت شد");
        } catch (error) {
            console.error("Error creating project:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8"
                encType="multipart/form-data"
            >
                <div className="mb-6">
                    <label className="block text-gray-700">ثبت موضوع</label>
                    <input
                        type="text"
                        placeholder="موضوع دلخواه را وارد کنید"
                        className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("subject", { required: "این فیلد الزامی است" })}
                    />
                    {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">انتخاب دسته بندی</label>
                    <select
                        {...register("category", { required: "این فیلد الزامی است" })}
                        className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="programming">برنامه نویسی</option>
                        <option value="app-design">طراحی اپلیکیشن</option>
                    </select>
                    {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">زمان پیشنهادی تحویل پروژه</label>
                    <input
                        type="text"
                        placeholder="زمان تحویل را وارد کنید"
                        className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("deadline", { required: "این فیلد الزامی است" })}
                    />
                    {errors.deadline && <span className="text-red-500">{errors.deadline.message}</span>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">توضیحات راجب پروژه</label>
                    <textarea
                        placeholder="توضیحات پروژه را وارد کنید"
                        className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("description", { required: "این فیلد الزامی است" })}
                    ></textarea>
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">آپلود فایل (اختیاری)</label>
                    <input
                        type="file"
                        className="w-full mt-2 bg-gray-100 p-2 rounded border border-gray-300"
                        {...register("file")}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">مهارت های مورد نیاز</label>
                    <input
                        type="text"
                        placeholder="مهارت‌ها را با کاما جدا کنید"
                        className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("skills", { required: "این فیلد الزامی است" })}
                    />
                    {errors.skills && <span className="text-red-500">{errors.skills.message}</span>}
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">حداقل بودجه</label>
                        <input
                            type="text"
                            placeholder="حداقل"
                            className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("rangeMin", { required: "این فیلد الزامی است" })}
                        />
                        {errors.rangeMin && <span className="text-red-500">{errors.rangeMin.message}</span>}
                    </div>
                    <div>
                        <label className="block text-gray-700">حداکثر بودجه</label>
                        <input
                            type="text"
                            placeholder="حداکثر"
                            className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("rangeMax", { required: "این فیلد الزامی است" })}
                        />
                        {errors.rangeMax && <span className="text-red-500">{errors.rangeMax.message}</span>}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        ثبت پروژه و انتشار
                    </button>
                </div>
            </form>
        </div>
    );
}
