"use client";
import React from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateProject() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('subject', data.subject);
        formData.append('category', data.category);
        formData.append('deadline', data.deadline);
        formData.append('description', data.description);
        formData.append('skills', data.skills.split(","));

        // تغییر نام فیلدهای رنج
        formData.append('rangeMin', data.rangeMin);
        formData.append('rangeMax', data.rangeMax);

        if (data.file && data.file[0]) {
            formData.append('file', data.file[0]);
        }

        try {
            console.log([...formData]);
            const response = await axios.post('http://localhost:5000/api/createProject/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("Project created successfully:", response.data);
            alert("با موفقیت ثبت شد")
        } catch (error) {
            console.error("Error creating project:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className={'p-2 bg-amber-50 mt-4'}>
                    <div className={'grid grid-cols-12 mt-4'}>
                        <div className={'col-span-4 flex justify-evenly'}>
                            <p>ثبت موضوع</p>
                            <input
                                type="text"
                                placeholder={'موضوع دلخواه را وارد کنید'}
                                className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2'}
                                {...register("subject", { required: "این فیلد الزامی است" })}
                            />
                            {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                        </div>

                        <div className={'col-span-4 flex justify-evenly'}>
                            <p>انتخاب دسته بندی</p>
                            <select
                                {...register("category", { required: "این فیلد الزامی است" })}
                                className={'w-[200px] bg-gray-400 rounded placeholder:text-white placeholder:p-2'}>
                                <option value="">انتخاب کنید</option>
                                <option value="programming">برنامه نویسی</option>
                                <option value="app-design">طراحی اپلیکیشن</option>
                            </select>
                            {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                        </div>

                        <div className={'col-span-4 flex justify-evenly'}>
                            <p>زمان پیشنهادی تحویل پروژه</p>
                            <input
                                type="text"
                                className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2'}
                                {...register("deadline", { required: "این فیلد الزامی است" })}
                            />
                            {errors.deadline && <span className="text-red-500">{errors.deadline.message}</span>}
                        </div>
                    </div>

                    <div className={'grid grid-cols-12 mt-8'}>
                        <div className={'col-span-12 flex justify-evenly items-center m-8'}>
                            <p className={'text-[20px]'}>توضیحات راجب پروژه</p>
                            <textarea
                                {...register("description", { required: "این فیلد الزامی است" })}
                                className={'min-w-[1000px] min-h-64 bg-gray-400 rounded placeholder:text-white placeholder:p-2 '}
                            />
                            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                        </div>
                    </div>

                    <div className={'grid grid-cols-12 mt-4 mb-5'}>
                        <div className={'col-span-6 flex justify-evenly'}>
                            <p>آپلود فایل (اختیاری)</p>
                            <input type="file" {...register("file")} />
                        </div>

                        <div className={'col-span-6 flex justify-evenly'}>
                            <p>مهارت های مورد نیاز</p>
                            <input
                                className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2'}
                                type="text"
                                {...register("skills", { required: "این فیلد الزامی است" })}
                            />
                            {errors.skills && <span className="text-red-500">{errors.skills.message}</span>}
                        </div>
                    </div>

                    <div className={'grid grid-cols-12 mt-8'}>
                        <div className={'col-span-12 flex justify-evenly'}>
                            <p>میزان بودجه شما چقدر است؟</p>
                            <div className={'flex justify-between'}>
                                <input
                                    type="text"
                                    className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2 ml-5'}
                                    {...register("range.min", { required: "این فیلد الزامی است" })}
                                />
                                <input
                                    type="text"
                                    className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2 ms-5'}
                                    {...register("range.max", { required: "این فیلد الزامی است" })}
                                />
                            </div>
                            {(errors.rangeMin || errors.rangeMax) && (
                                <span className="text-red-500">
                                    {errors.rangeMin?.message || errors.rangeMax?.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={'grid grid-cols-12 mt-8 m-2'}>
                        <div className={'col-span-12 flex justify-end'}>
                            <button type={'submit'} className={'bg-blue-500 text-white p-2 rounded '}>
                                ثبت پروژه و انتشار
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
