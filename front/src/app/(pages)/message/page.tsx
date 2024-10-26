"use client"

import React, {useEffect, useState} from "react";
import {FreelancerM} from "@/Components/Messages/FreelancerM";
import {KarfarmaM} from "@/Components/Messages/KarfarmaM";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Message() {
    const [freelancerM, setFreelancerM] = useState(false);
    const [karfarmaM, setKarfarmaM] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false); // حالت جدید برای فعال‌سازی چت‌باکس
    const [message, setMessage] = useState("");
    const [chatMessage, setChatMessage] = useState([]);

    const FreelancerMessage = () => {
        setFreelancerM(true);
        setKarfarmaM(false);
        setIsChatActive(true);
    };

    const KarfarmaMessageToggle = () => {
        setKarfarmaM(true);
        setFreelancerM(false);
        setIsChatActive(true);
    };

    //ارسال پیام به سرور با نقش و متن پیام
    const sendMessage = () => {
        if (message.trim()) {
            const role = freelancerM ? "freelancer" : "karfarma";
            socket.emit("sendMessage", {text: message, role: role});
            setMessage(""); // پاک کردن پیام ورودی
        }
    };

    // دریافت پیام از سرور و فیلتر بر اساس نقش کاربر
    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setChatMessage((prevMessages) => [...prevMessages, msg]);
        });
        return () => socket.off("receiveMessage");
    }, []);

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
                            <button
                                onClick={FreelancerMessage}
                                className={"bg-gray-600 p-2 rounded-full text-white"}
                            >
                                پیام های فریلنسری
                            </button>
                            <button
                                onClick={KarfarmaMessageToggle}
                                className={"bg-gray-600 p-2 rounded-full text-white"}
                            >
                                پیام های کارفرمایی
                            </button>
                        </div>
                        <button>{freelancerM && <FreelancerM/>}</button>
                        <button>{karfarmaM && <KarfarmaM/>}</button>
                    </div>
                    <div
                        className={`col-span-8 bg-gray-200 flex items-center justify-center chat ${
                            isChatActive ? "" : "hidden"
                        }`}
                    >
                        <div className="flex-1 overflow-y-auto p-4">
                            {chatMessage.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`p-2 ${
                                        msg.role === "freelancer" ? "text-right" : "text-left"
                                    }`}
                                >
                  <span>
                    {msg.role === "freelancer" ? "فریلنسر" : "کارفرما"}: {msg.text}
                  </span>
                                </div>
                            ))}
                        </div>
                        <div className="p-2 flex">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 p-2 border rounded"
                                placeholder="پیام خود را وارد کنید"
                            />
                            <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded ml-2">
                                ارسال
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
