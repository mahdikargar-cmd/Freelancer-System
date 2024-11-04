import React, { useEffect, useState } from "react";
import axios from "axios";

export const FreelancerM = ({ onSuggestionClick }) => { // Accept onSuggestionClick as a prop
    const [gData, setGData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("authToken:", token);

            const response = await axios.get("http://localhost:5000/api/suggestProject/freelancerMessages", {
                headers: {
                    Authorization: `Bearer ${token}`, // Fixed template literal syntax
                },
            });
            setGData(response.data.suggestions); // Adjusted for response structure
            console.log(response.data.projects);
        } catch (error) {
            console.error("Error fetching freelancer messages:", error.response?.data || error);
        }
    };

    return (
        <>
            {gData.map((item, index) => (
                <div key={index} className={'bg-gray-300 p-2 mt-4 m-2 '} onClick={() => onSuggestionClick(item)}>
                    <div className={'grid grid-cols-12'}>
                        <div className={'col-span-12 flex justify-between'}>
                            <p>{item.subject}</p>
                            <p>تاریخ {new Date(item.created_At).toLocaleDateString("fa-IR")}</p>
                        </div>
                    </div>
                    <div className={'grid grid-cols-12'}>
                        <div className={'col-span-12 flex'}>{item.description}</div>
                    </div>
                </div>
            ))}
        </>
    );
};
