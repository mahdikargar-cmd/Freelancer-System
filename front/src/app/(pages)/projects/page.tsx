"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { MdOutlineSearch } from "react-icons/md";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/createProject"); // Adjust API URL as needed
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <div className={'bg-amber-50 rounded'}>
                {/* Filter Section */}
                <div className={'grid grid-cols-12 font-bold mt-5 '}>
                    <div className={'flex justify-center text-center col-span-12 text-3xl '}>
                        <p className={'underline underline-offset-8 mt-4'}>لیست پروژه ها</p>
                    </div>
                </div>
                <div className={'grid grid-cols-12 mt-12 mb-5'}>
                    <div className={'col-span-12 flex justify-center p-2 items-center text-2xl '}>
                        <p>جستجوی پروژه</p>
                        <input type="search" className={'shadow-md rounded-2xl ms-11 ml-5'} />
                        <MdOutlineSearch />
                    </div>
                </div>

                {/* Filter Options */}
                <div className={'grid grid-cols-12 text-xl mt-10'}>
                    <div className={'col-span-4 flex justify-center items-center'}>
                        <p className={'ml-5'}>فیلتر دسته بندی</p>
                        <select name="نوع پروژه" id="category">
                            <option value="software_development">توسعه نرم افزار</option>
                            <option value="web_design">طراحی وب</option>
                            <option value="marketing_sales">بازاریابی و فروش</option>
                        </select>
                    </div>
                    <div className={'col-span-4 flex justify-center items-center'}>
                        <p className={'ml-5'}>مهارت ها</p>
                        <select name="skills" id="skills">
                            <option value="photoshop">Photoshop</option>
                            <option value="html">HTML</option>
                            <option value="react">React</option>
                        </select>
                    </div>
                    <div className={'col-span-4 flex justify-center items-center'}>
                        <p className={'ml-5'}>نوع پیشرفت پروژه</p>
                        <select name="progress" id="progress">
                            <option value="full_time">تمام وقت</option>
                            <option value="part_time">پاره وقت</option>
                            <option value="remote">دورکاری</option>
                        </select>
                    </div>
                </div>

                {/* Sorting and Project Count */}
                <div className={'grid grid-cols-12 mt-24 p-2 text-[15px]'}>
                    <div className={'col-span-2 flex justify-center items-center'}>
                        <p className={'ml-5'}>مرتب سازی براساس</p>
                        <select name="sort" id="sort">
                            <option value="newest">جدیدترین</option>
                            <option value="most_expensive">گرانترین</option>
                            <option value="cheapest">ارزانترین</option>
                        </select>
                    </div>
                    <div className={'col-span-2 flex justify-center items-center'}>
                        <p className={'ml-5'}>تعداد پروژه های یافت شده</p>
                        <p>{projects.length}</p>
                    </div>
                </div>
            </div>

            {/* Projects List */}


            {projects.length > 0 ? (
                projects.map((project, index) => (
                    <div className={'grid grid-cols-12'}>
                        <div className={'col-span-12 flex justify-center mt-4'}>
                            <div key={index} className={'w-[900px]  bg-amber-50 p-5 rounded-lg shadow-inner'}>
                                <div className={'grid grid-cols-12'}>
                                    <div className={'col-span-12 flex justify-between'}>
                                        <p className={'text-xl font-bold'}>{project.subject}</p>
                                        <p>قیمت پیشنهادی کارفرما بین {project.range.min} تا {project.range.max} میلیون</p>
                                    </div>
                                </div>
                                <div className={'grid grid-cols-6 mt-4'}>
                                    <div className={'col-span-6 flex justify-between'}>
                                        <p>زمان اتمام آگهی {project.deadline} روز</p>
                                        <Link href={`/projects/${project._id}`}>
                                            <button className={'text-2xl bg-blue-500 text-white rounded p-2 ms-14'}>
                                                بررسی پروژه
                                            </button>
                                        </Link>
                                        <p>مهارت های مورد نیاز: {project.skills.join(', ')}</p>
                                    </div>
                                </div>
                                <div className={'grid grid-cols-6 mt-4'}>
                                    <div className={'col-span-12 flex justify-between'}>
                                        <p>تعداد پیشنهادات تا به الان 30 تا</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>هیچ پروژه‌ای یافت نشد</p>
            )}

        </>
    );
};

export default ProjectsPage;
