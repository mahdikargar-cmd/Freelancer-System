import React, { useEffect, useState } from "react";
import axios from "axios";

export const FreelancerM = ({ onSuggestionClick }) => {
    const [freelancerMessage, setFreelancerMessage] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found!");
                return;
            }

            const response = await axios.get("http://localhost:5000/api/suggestProject/freelancerMessages", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const suggestions = Array.isArray(response.data.suggestions) ? response.data.suggestions : [];
            setFreelancerMessage(suggestions);

            console.log("Freelancer Messages:", suggestions);
        } catch (error) {
            console.error("Error fetching freelancer messages:", error.response?.data || error);
        }
    };

    return (
        <>
            {freelancerMessage.length > 0 ? (
                freelancerMessage.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-300 p-2 mt-4 m-2 cursor-pointer"
                        onClick={() => onSuggestionClick(item)}
                    >
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 flex justify-between">
                                <p>{item.subject}</p>
                                <p>تاریخ {new Date(item.createdAt).toLocaleDateString("fa-IR")}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">{item.description}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p>پیامی برای نمایش وجود ندارد.</p>
            )}
        </>
    );
};
