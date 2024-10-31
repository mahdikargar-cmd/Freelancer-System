import React, { useEffect, useState } from "react";
import axios from "axios";

export const FreelancerM = () => {
    const [gData, setGData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await axios.get('http://localhost:5000/api/suggestProject/getSuggest');
        setGData(response.data.projects);
    };

    return (
        <>
            {gData.map((item, index) => (
                <div key={index} className={'bg-gray-300 p-2 mt-4 m-2 '}>
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
