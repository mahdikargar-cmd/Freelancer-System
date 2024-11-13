"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import io from "socket.io-client";
import {FreelancerM} from "../../../Components/Messages/FreelancerM";
import {KarfarmaM} from "../../../Components/Messages/KarfarmaM";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";

let socket;

function Message() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [freelancerM, setFreelancerM] = useState(false);
    const [karfarmaM, setKarfarmaM] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [aiLocked, setAiLocked] = useState(false);
    const [userRole, setUserRole] = useState('');

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
                setChatMessages((prev) => [...prev, messageData]);
            });
        }
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);
   useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) setUserRole(role);
}, []);

    
    useEffect(() => {
        if (selectedSuggestion) {
            axios
                .get(`http://localhost:5000/api/messages/project/${selectedSuggestion._id}`)
                .then(response => {
                    setChatMessages(response.data.map(msg => ({
                        ...msg,
                        senderRole: msg.role
                    })));
                })
                .catch(error => console.error("Error loading messages:", error));
    
            // دریافت وضعیت هوش مصنوعی
            axios.get(`http://localhost:5000/api/toggleAI/status/${selectedSuggestion._id}`)
                .then(statusResponse => {
                    setAiLocked(statusResponse.data);
                })
                .catch(error => console.error("Error fetching AI status:", error));
        }
    }, [selectedSuggestion]);
    
    

    const FreelancerMessage = () => {
        setFreelancerM(true);
        setKarfarmaM(false);
        setIsChatActive(true);
        localStorage.setItem("userRole", "freelancer");
    };

    const KarfarmaMessageToggle = () => {
        setKarfarmaM(true);
        setFreelancerM(false);
        setIsChatActive(true);
        localStorage.setItem("userRole", "employer");
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setIsChatActive(true);
    };

    const sendMessage = () => {
        const role = localStorage.getItem("userRole");
    
        // اگر هوش مصنوعی قفل باشد و نقش کاربر فریلنسر باشد، پیام ارسال نمی‌شود
        if (aiLocked && role === "freelancer") {
            console.log("هوش مصنوعی غیرفعال است، پیام فریلنسر پردازش نمی‌شود.");
            setChatMessages((prev) => [...prev, { content: message, senderRole: role }]); // پیام فقط در چت نمایش داده می‌شود
            setMessage("");
            return;
        }
    
        if (socket && message.trim() && selectedSuggestion) {
            const messageData = {
                content: message,
                projectId: selectedSuggestion._id,
                employerId: selectedSuggestion.user,
                senderRole: role,
            };
    
            socket.emit("sendMessage", messageData);
            setChatMessages((prev) => [...prev, { ...messageData, senderRole: role }]);
            setMessage("");
        } else {
            console.error("Some required parameters are missing", { message, selectedSuggestion });
        }
    };
    
    
    
    const toggleAi = async () => {
        if (!selectedSuggestion) {
            console.error("No project selected");
            return;
        }
    
        try {
            const projectId = selectedSuggestion._id;
            const response = await axios.post("http://localhost:5000/api/toggleAI", { projectId });
            setAiLocked(response.data);
        } catch (error) {
            console.error("Error toggling AI:", error);
        }
    };
    
    
    

    const renderToggleButton = () => {
        if (userRole === "employer" && selectedSuggestion) {
            return (
                <button onClick={toggleAi}>
                    {aiLocked ? "فعال کردن هوش مصنوعی" : "غیرفعال کردن هوش مصنوعی"}
                </button>
            );
        }
        return null;
    };
    
    
    useEffect(() => {
        if (isMounted) {
            socket = io("http://localhost:5000");
            socket.on("receiveMessage", (messageData) => {
                setChatMessages((prev) => [...prev, messageData]);
            });
        }
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [isMounted]);
    
    


    
    if (!isMounted || !isLoggedIn) return null;

    return (
        <div className={"mt-4 pb-5 flex justify-center"}>
            <div className={"bg-amber-50 w-[1000px] h-[90vh]"}>
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
                            <div>
                                <div className={"border-amber-200 border-2 bg-white m-6 rounded-full p-4"}>
                                    <div className={"grid grid-cols-12"}>
                                        <div className={"col-span-12 flex justify-center"}>
                                            <h3>پیشنهاد پروژه: {selectedSuggestion.subject}</h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <div className={"col-span-12 flex justify-between"}>
                                            <p>قیمت: {selectedSuggestion.price}</p>
                                            <p>مدت زمان: {selectedSuggestion.deadline} روز</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <div className={"col-span-12 pb-4 p-2"}>
                                            <p>توضیحات: {selectedSuggestion.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="bg-gray-200 chat-content overflow-y-scroll h-[250px] p-4 bg-gray-100 flex flex-col">
                                    {chatMessages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`p-2 w-[300px] my-2 rounded-md  ${
                                                msg.senderRole === "freelancer" ? "bg-blue-200 self-start text-right" : "bg-green-200 self-end text-left"
                                            }`}
                                        >
                                            <p>{msg.content}</p>
                                            <span className="text-sm text-gray-600">
                                                فرستنده: {
                                                msg.senderRole === "freelancer" ? "فریلنسر" :
                                                    msg.senderRole === "employer" ? "کارفرما" :
                                                        "هوش مصنوعی"
                                            }
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex mt-4 mb-3 pl-3 ps-3">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="flex-grow p-2 border rounded-l-md"
                                        placeholder="پیام خود را بنویسید..."
                                    />
                                    {renderToggleButton()}
                                    <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-md">
                                        ارسال پیام
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p>لطفا یک پیشنهاد پروژه را برای شروع گفتگو انتخاب کنید</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
