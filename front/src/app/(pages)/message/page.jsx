"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import io from "socket.io-client";
import {FreelancerM} from "../../../Components/Messages/FreelancerM";
import {KarfarmaM} from "../../../Components/Messages/KarfarmaM";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";

let socket;

function Message() {
    const {isLoggedIn} = useAuth();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [freelancerM, setFreelancerM] = useState(false);
    const [karfarmaM, setKarfarmaM] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [message, setMessage] = useState("");
    const [chatMessage, setChatMessage] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        socket = io("http://localhost:5000");
    }, []);

    useEffect(() => {
        if (isMounted && !isLoggedIn) {
            router.push("/login");
        }
    }, [isMounted, isLoggedIn]);

    useEffect(() => {
        if (socket) {
            socket.on("receiveMessage", (messageData) => {
                console.log("Received message data:", messageData);
                setChatMessage((prev) => [...prev, messageData]);
            });
        }
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    const FreelancerMessage = () => {
        setFreelancerM(true);
        setKarfarmaM(false);
        setIsChatActive(true);
        localStorage.setItem("userRole", "freelancer");  // ثبت نقش فریلنسر
    };

    const KarfarmaMessageToggle = () => {
        setKarfarmaM(true);
        setFreelancerM(false);
        setIsChatActive(true);
        localStorage.setItem("userRole", "employer");  // ثبت نقش کارفرما
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setIsChatActive(true);
    };

    const sendMessage = () => {
        if (socket && message.trim() && selectedSuggestion) {
            const role = localStorage.getItem("userRole");

            const messageData = {
                content: message,
                projectId: selectedSuggestion._id,
                employerId: selectedSuggestion.user,
                senderRole: role  // استفاده از نقش ذخیره‌شده
            };

            if (!messageData.senderRole || !messageData.content || !messageData.projectId) {
                console.error("Some required parameters are missing:", messageData);
                return;
            }

            socket.emit("sendMessage", messageData);
            setChatMessage((prev) => [...prev, {...messageData, senderRole: role}]);
            setMessage("");
        } else {
            console.error("Some required parameters are missing", {message, selectedSuggestion});
        }
    };

    useEffect(() => {
        if (selectedSuggestion) {
            axios.get(`http://localhost:5000/api/messages/project/${selectedSuggestion._id}`)
                .then(response => {
                    const messages = response.data.map(msg => ({
                        ...msg,
                        senderRole: msg.senderRole ,
                    }));
                    setChatMessage(messages);
                })
                .catch(error => {
                    console.error("خطا در بارگذاری پیام‌ها:", error);
                });
        }
    }, [selectedSuggestion]);


    if (!isMounted || !isLoggedIn) return null;

    return (
        <div className={"mt-4 pb-5 flex justify-center"}>
            <div className={"bg-amber-50 w-[1000px]"}>
                <div className={"grid grid-cols-12"}>
                    <div className={"col-span-12 flex justify-center mt-4"}>
                        <p className={"text-2xl font-bold"}>پیام های من</p>
                    </div>
                </div>
                <div className={"grid grid-cols-12 h-[500px] m-4"}>
                    <div className={"col-span-4 flex flex-col"}>
                        <div className={"flex justify-evenly ml-2"}>
                            <button onClick={FreelancerMessage} className={"bg-gray-600 p-2 rounded-full text-white"}>
                                پیام های فریلنسری
                            </button>
                            <button onClick={KarfarmaMessageToggle}
                                    className={"bg-gray-600 p-2 rounded-full text-white"}>
                                پیام های کارفرمایی
                            </button>
                        </div>
                        {freelancerM && <FreelancerM onSuggestionClick={handleSuggestionClick}/>}
                        {karfarmaM && <KarfarmaM onSuggestionClick={handleSuggestionClick}/>}
                    </div>
                    <div className={`col-span-8 bg-gray-200 chat ${isChatActive ? "" : "hidden"}`}>
                        {selectedSuggestion ? (
                            <div className={'border-amber-200 border-2 bg-white m-6 rounded-full p-4'}>
                                <div className={'grid grid-cols-12'}>
                                    <div className={'col-span-12 flex justify-center'}>
                                        <h3>پیشنهاد پروژه: {selectedSuggestion.subject}</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12">
                                    <div className={'col-span-12 flex justify-between'}>
                                        <p>قیمت: {selectedSuggestion.price}</p>
                                        <p>مدت زمان: {selectedSuggestion.deadline} روز</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12">
                                    <div className={'col-span-12 pb-4 p-2'}>
                                        <p>توضیحات: {selectedSuggestion.description}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>لطفا یک پیشنهاد را انتخاب کنید</p>
                        )}
                        <div className="overflow-y-auto p-4">
                            <div className="overflow-y-auto p-4">
                                {chatMessage.map((msg, index) => (
                                    <div key={index}
                                         className={`p-2 ${msg.senderRole === "freelancer" ? "text-right" : "text-left"}`}>
                 <span>
                           {msg.senderRole === "freelancer" ? "فریلنسر: " : "کارفرما: "}
                     {msg.content}
                 </span>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2 grid grid-cols-12 bg-gray-300 m-6 shadow-2xl">
                    <div className={'col-span-12 flex'}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 p-2 border rounded"
                            placeholder="پیام خود را وارد کنید"
                        />
                        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded ml-2">ارسال</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
