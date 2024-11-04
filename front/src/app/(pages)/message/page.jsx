
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { FreelancerM } from "../../../Components/Messages/FreelancerM";
import { KarfarmaM } from "../../../Components/Messages/KarfarmaM";
import {useAuth} from "../../context/AuthContext";


const socket = io("http://localhost:5000");

function Message() {
    const { isLoggedIn } = useAuth(); // دریافت وضعیت ورود از Context
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false); // برای کنترل رندرینگ سمت کلاینت

    const [freelancerM, setFreelancerM] = useState(false);
    const [karfarmaM, setKarfarmaM] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [message, setMessage] = useState("");
    const [chatMessage, setChatMessage] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !isLoggedIn) {
            router.push("/login");
        }
    }, [isMounted, isLoggedIn]);

    const FreelancerMessage = () => {
        setFreelancerM(true);
        setKarfarmaM(false);
        setIsChatActive(true);
    };

    const KarfarmaMessageToggle = () => {
        setKarfarmaM(true);
        setFreelancerM(false);
        setIsChatActive(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setIsChatActive(true);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const role = freelancerM ? "freelancer" : "karfarma";
            const messageData = {
                text: message,
                role: role,
                suggestionId: selectedSuggestion._id,
                employerId: selectedSuggestion.user
            };

            socket.emit("sendMessage", messageData);
            setChatMessage((prev) => [...prev, messageData]);
            setMessage("");
        }
    };

    useEffect(() => {
        socket.on("receiveMessage", (messages) => {
            setChatMessage(messages);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [selectedSuggestion]);

    if (!isMounted || !isLoggedIn) return null; // از رندرینگ جلوگیری می‌کند تا زمانی که در سمت کلاینت رندر شود و کاربر لاگین کرده باشد

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
                        {freelancerM && <FreelancerM />}
                        {karfarmaM && <KarfarmaM onSuggestionClick={handleSuggestionClick} />}
                    </div>
                    <div className={`col-span-8 bg-gray-200 chat ${isChatActive ? "" : "hidden"}`}>
                        {selectedSuggestion ? (
                            <div className={'border-amber-200 border-2  bg-white m-6 rounded-full p-4'}>
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
                            {chatMessage.map((msg, index) => (
                                <div key={index}
                                     className={`p-2 ${msg.role === "freelancer" ? "text-right" : "text-left"}`}>
                                    <span>{msg.role === "freelancer" ? "فریلنسر" : "کارفرما"}: {msg.text}</span>
                                </div>
                            ))}
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
