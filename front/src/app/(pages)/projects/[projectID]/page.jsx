"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";

function ProjectCheckout() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [modal, setModal] = useState(false);
    const [getData, setGetData] = useState([]);
    const { projectID } = useParams();
    const { isLoggedIn, user } = useAuth();

    useEffect(() => {
        if (projectID) {
            fetchData();
        }
    }, [projectID]);

    const getUserId = () => user?.id || localStorage.getItem("userId");

    useEffect(() => {
        const currentUserId = getUserId();
        if (isLoggedIn && currentUserId) {
            localStorage.setItem("userId", currentUserId);
        } else {
            localStorage.removeItem("userId");
            alert("User is not logged in. Please log in.");
        }
    }, [isLoggedIn, user?.id]);

    const postData = async (formData) => {
        try {
            const currentUserId = getUserId();
            if (!currentUserId) {
                alert("Please log in to submit your suggestion.");
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                alert("Authentication token is missing. Please log in again.");
                return;
            }

            if (!projectID) {
                alert("Project ID is missing. Please try again.");
                return;
            }

            const dataToSend = { ...formData, user: String(currentUserId), projectId: projectID };
            console.log("Data being sent:", dataToSend); // Debugging log

            const response = await axios.post(
                "http://localhost:5000/api/suggestProject/createSuggest",
                dataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Suggestion submitted successfully");
        } catch (error) {
            console.error("Error submitting project suggestion:", error.message || error);
            alert("Error submitting suggestion: " + (error.response?.data.message || "Unknown error"));
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/createProject/${projectID}`);
            setGetData(Array.isArray(response.data) ? response.data : [response.data]);
            console.log("API Response:", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const changeModal = () => setModal(!modal);
    const closeModal = (e) => { if (e.target.id === "modalBackground") setModal(false); };

    return (
        <>
            <div className="flex justify-center mt-4 items-center">
                {getData.map((item, index) => (
                    <div key={index} className="w-[900px] bg-amber-50 p-3 rounded shadow-lg">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 flex justify-between items-center">
                                <p className="font-bold text-[20px]">{item.subject}</p>
                                <button onClick={changeModal} className="bg-blue-500 text-white p-2 rounded-md">
                                    پیشنهاد روی پروژه
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 mt-8">
                            <div className="col-span-12 flex justify-start leading-8 text-[18px]">
                                <p>{item.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 mt-8">
                            <div className="col-span-12 flex justify-between">
                                <p className="font-bold">مهارت های مورد نیاز :</p>
                                <p className="border-b-blue-500 border-2 pl-2 ps-2 rounded-full">{item.skills}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modal && (
                <form onSubmit={handleSubmit(postData)}>
                    <div
                        id="modalBackground"
                        onClick={closeModal}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-full max-w-3xl mx-auto h-auto p-6 rounded-lg shadow-2xl relative">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                ✕
                            </button>

                            <h2 className="text-2xl font-semibold text-center mb-6">ثبت پیشنهاد روی پروژه</h2>

                            <div className="grid grid-cols-12 gap-4 mb-4">
                                <div className="col-span-6">
                                    <label className="block mb-1 text-gray-700">موضوع</label>
                                    <input
                                        type="text"
                                        {...register("subject", { required: true })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <label className="block mb-1 text-gray-700">مدت زمان انجام پروژه</label>
                                    <input
                                        type="text"
                                        {...register("deadline", { required: true })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 text-gray-700">چرا کارفرما باید به شما اعتماد کند؟</label>
                                <textarea
                                    {...register("description", { required: true })}
                                    className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block mb-1 text-gray-700">قیمت پیشنهادی شما</label>
                                <input
                                    type="text"
                                    {...register("price", { required: "Please enter a price" })}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                                    لغو
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
                                    ثبت پیشنهاد
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}

        </>
    );
}

export default ProjectCheckout;
