"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { MdOutlineSearch } from "react-icons/md";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [category, setCategory] = useState("");
    const [skills, setSkills] = useState("");
    const [progress, setProgress] = useState("");
    const [search, setSearch] = useState("");

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/createProject", {
                params: { category, skills, progress, search }
            });
            console.log("Projects Data:", response.data);
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [category, skills, progress, search]);

    return (
        <>
            <div className="bg-amber-50 rounded p-6 m-8 shadow-lg">
                {/* Header */}
                <div className="text-center text-3xl font-bold underline underline-offset-8 mt-4">
                    <p>لیست پروژه ها</p>
                </div>

                {/* Search */}
                <div className="flex justify-center items-center mt-8 mb-5 text-2xl">
                    <p className="mr-5">جستجوی پروژه</p>
                    <input
                        type="search"
                        className="p-2 rounded-xl shadow-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <MdOutlineSearch className="text-gray-600 ml-2" />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xl mt-8">
                    <div className="flex justify-center items-center">
                        <p className="ml-5">فیلتر دسته بندی</p>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-2 rounded border bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">همه</option>
                            <option value="software_development">توسعه نرم افزار</option>
                            <option value="web_design">طراحی وب</option>
                            <option value="marketing_sales">بازاریابی و فروش</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="ml-5">مهارت ها</p>
                        <select
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="p-2 rounded border bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">همه</option>
                            <option value="photoshop">Photoshop</option>
                            <option value="html">HTML</option>
                            <option value="react">React</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="ml-5">نوع پیشرفت پروژه</p>
                        <select
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                            className="p-2 rounded border bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">همه</option>
                            <option value="full_time">تمام وقت</option>
                            <option value="part_time">پاره وقت</option>
                            <option value="remote">دورکاری</option>
                        </select>
                    </div>
                </div>

                {/* Sorting */}
                <div className="text-center mt-12 p-2 text-lg">
                    <p className="inline-block">تعداد پروژه های یافت شده: </p>
                    <span>{projects.length}</span>
                </div>
            </div>

            {/* Projects List */}
            {projects.length > 0 ? (
                projects.map((project) => (
                    <div key={project._id} className="flex justify-center mt-4">
                        <div className="w-[900px] bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{project.subject}</h2>
                                <p className="text-sm text-gray-600">
                                    {project.range
                                        ? `قیمت پیشنهادی کارفرما بین ${project.range.min} تا ${project.range.max} میلیون`
                                        : "قیمت نامشخص"}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-600">زمان اتمام آگهی: {project.deadline} روز</p>
                                <Link href={`/projects/${project._id}`}>
                                    <button className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-lg">
                                        بررسی پروژه
                                    </button>
                                </Link>
                                <p className="text-gray-600">مهارت های مورد نیاز: {project.skills.join(", ")}</p>
                            </div>
                            <div className="flex justify-end text-gray-600 text-sm">
                                <p>تعداد پیشنهادات تا به الان 30 تا</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 mt-8">
                    <p>هیچ پروژه‌ای یافت نشد</p>
                </div>
            )}
        </>
    );
};

export default ProjectsPage;
