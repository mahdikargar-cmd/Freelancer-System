"use client"
import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation";
import axios from "axios";

function ProjectCheckout() {
    const [modal, setModal] = useState(false);
    const [getData, setGetData] = useState([]);
    const { projectID } = useParams();
    useEffect(() => {
        console.log("id :", projectID);
        if (projectID) {
            fetchData();
        }
    }, [projectID]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/createProject/${projectID}`);
            console.log(response)
            const data = Array.isArray(response.data) ? response.data : [response.data];
            setGetData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const changeModal = () => {
        setModal(!modal);
    }

    const closeModal = (e) => {
        if (e.target.id === 'modalBackground') {
            setModal(false);
        }
    }

    return (
        <>
            <div className={'flex justify-center mt-4 items-center'}>
                {
                    getData.map((item , index) => (
                        <div key={index}>
                            <div className={'w-[900px] bg-amber-50 p-3 rounded'}>
                                <div className={'grid grid-cols-12'}>
                                    <div className={'col-span-12 flex justify-between items-center'}>
                                        <p className={'font-bold text-[20px]'}>{item.subject}</p>
                                        <button onClick={changeModal}
                                                className={'bg-blue-500 text-white p-2 rounded-md'}>پیشنهاد
                                            روی پروژه
                                        </button>
                                    </div>
                                </div>
                                <div className={'grid grid-cols-12 mt-8'}>
                                    <div className={'col-span-12 flex justify-start leading-8 text-[18px]'}>
                                        <p>{item.description}  </p>
                                    </div>
                                </div>
                                <div className={'grid grid-cols-12 mt-8'}>
                                    <div className={'col-span-12 flex justify-between'}>
                                        <p className={'font-bold'}>مهارت های مورد نیاز :</p>
                                        <p className={'border-b-blue-500 border-2 pl-2 ps-2 rounded-full'}>{item.skills}</p>

                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }

            </div>

            {modal && (
                <div
                    id="modalBackground"
                    onClick={closeModal}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                    <div className="bg-amber-50 w-[800px] h-[700px] p-6 rounded-lg text-center  ">

                        <div className="grid grid-cols-12 m-2">

                            <div className={'col-span-6 p-2 flex justify-between'}>
                                <p>
                                    موضوع
                                </p>
                                <input type="text" className={'bg-gray-400 rounded'}/>
                            </div>
                            <div className={'col-span-6 p-2 flex justify-between'}>
                                <p> مدت زمان انجام پروژه</p>
                                <input type="text" className={'bg-gray-400 rounded'}/>
                            </div>
                        </div>
                        <div className={'grid grid-cols-12'}>
                            <div className={'col-span-12 mt-8 flex justify-evenly items-center'}>
                                <p>چرا کارفرما باید به شما اعتماد کند؟</p>
                                <textarea className={'bg-gray-400  w-[500px] h-[300px] rounded'}/>

                            </div>
                        </div>
                        <div className={'grid grid-cols-12'}>
                            <div className={'col-span-12 mt-8 flex justify-evenly items-center '}>
                                <p>قیمت پیشنهادی تون روی پروژه</p>
                                <input type="text" className={'bg-gray-400 rounded'}/>
                            </div>
                        </div>
                        <div className={'grid grid-cols-12 '}>
                            <div className={'col-span-12 mt-32 flex justify-evenly'}>
                                <button onClick={closeModal}
                                        className={'bg-red-500 text-white p-1 ps-3 pl-3 rounded'}>لغو
                                </button>
                                <button className={'bg-green-500 text-white p-1 ps-3 pl-3 rounded'}>ثبت برروی پروژه
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProjectCheckout;
