import React, { useEffect, useState } from "react";
import axios from "axios";

export const KarfarmaM = ({ onSuggestionClick }) => {
    const [karfarmaMessage, setKarfarmaMessage] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/suggestProject/getSuggest", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // ارسال توکن احراز هویت
                },
            });

            setKarfarmaMessage(Array.isArray(response.data.projects) ? response.data.projects : []);
        } catch (error) {
            console.log("error: ", error);
        }
    };



    return (
        <>
            {karfarmaMessage.length > 0 ? (
                karfarmaMessage.map((item, index) => (
                    <div
                        key={index}
                        className={'bg-gray-300 p-2 mt-4 m-2 flex justify-evenly cursor-pointer'}
                        onClick={() => onSuggestionClick(item)}
                    >
                        <p>{item.subject}</p>
                        <p>تاریخ {new Date(item.created_At).toLocaleDateString("fa-IR")}</p>
                    </div>
                ))
            ) : (
                <p>پیشنهادی یافت نشد.</p>
            )}
        </>
    );
};
