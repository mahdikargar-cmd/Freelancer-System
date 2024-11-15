"use client"
import React, {useEffect, useState, useCallback, useRef} from "react";
import {useRouter} from "next/navigation";
import io from "socket.io-client";
import {FreelancerM} from "../../../Components/Messages/FreelancerM";
import {KarfarmaM} from "../../../Components/Messages/KarfarmaM";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";
import {toast} from "react-hot-toast";
import '../../../public/style/styleMEssage.css'

let socket;

function Message() {
    const {isLoggedIn} = useAuth();
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
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);


    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    // Initialize socket and load AI status
    useEffect(() => {
        setIsMounted(true);
        socket = io("http://localhost:5000");

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    // Authentication check
    useEffect(() => {
        if (isMounted && !isLoggedIn) {
            router.push("/login");
        }
    }, [isMounted, isLoggedIn, router]);

    // Load user role
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role) {
            setUserRole(role);
        }
    }, [isMounted, isLoggedIn]);

    // Socket message handler
    useEffect(() => {
        if (socket) {
            socket.on("receiveMessage", (messageData) => {
                setChatMessages((prev) => [...prev, messageData]);
            });

            socket.on("error", (error) => {
                toast.error(error.message);
            });
        }
    }, []);

    // Load project messages and AI status
    const loadProjectData = useCallback(async (projectId) => {
        setIsLoading(true);
        try {
            const messagesResponse = await axios.get(`http://localhost:5000/api/messages/project/${projectId}`);
            setChatMessages(messagesResponse.data.map(msg => ({
                ...msg,
                senderRole: msg.role
            })));
        } catch (error) {
            toast.error("خطا در بارگذاری پیام‌ها");
            console.error("Error loading project data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Handle project selection
    useEffect(() => {
        if (selectedSuggestion) {
            localStorage.setItem("currentProjectId", selectedSuggestion._id);
            loadProjectData(selectedSuggestion._id);
        }
    }, [selectedSuggestion, loadProjectData]);

    const FreelancerMessage = () => {
        setFreelancerM(true);
        setKarfarmaM(false);
        setIsChatActive(true);
        localStorage.setItem("userRole", "freelancer");
        setUserRole("freelancer");
    };

    const KarfarmaMessageToggle = () => {
        setKarfarmaM(true);
        setFreelancerM(false);
        setIsChatActive(true);
        localStorage.setItem("userRole", "employer");
        setUserRole("employer");
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setIsChatActive(true);
    };

    const sendMessage = async () => {
        if (!message.trim() || !selectedSuggestion) return;

        const role = localStorage.getItem("userRole");

        if (aiLocked && role === "freelancer") {
            toast.error("هوش مصنوعی غیرفعال است. پیام شما فقط ذخیره می‌شود.");
        }

        try {
            const messageData = {
                content: message,
                projectId: selectedSuggestion._id,
                employerId: selectedSuggestion.user,
                senderRole: role,
            };

            // ارسال پیام به سرور از طریق سوکت
            socket.emit("sendMessage", messageData);
            setMessage("");

            // افزودن پیام به UI به صورت محلی
            setChatMessages((prev) => [...prev, {...messageData, senderRole: role}]);

        } catch (error) {
            toast.error("خطا در ارسال پیام");
            console.error("Error sending message:", error);
        }
    };

    const toggleAi = async () => {
        if (!selectedSuggestion) {
            toast.error("لطفا یک پروژه را انتخاب کنید");
            return;
        }

        setIsLoading(true);
        try {
            const projectId = selectedSuggestion._id;
            const newAiLockStatus = !aiLocked;

            const response = await axios.post("http://localhost:5000/api/toggleAI", {
                projectId,
                aiLocked: newAiLockStatus
            });

            setAiLocked(response.data.aiLocked);
            localStorage.setItem(`aiStatus_${projectId}`, response.data.aiLocked.toString());

            toast.success(response.data.aiLocked ?
                "هوش مصنوعی غیرفعال شد" :
                "هوش مصنوعی فعال شد"
            );
        } catch (error) {
            toast.error("خطا در تغییر وضعیت هوش مصنوعی");
            console.error("Error toggling AI:", error);
        } finally {
            setIsLoading(false);
        }
    };


    if (!isMounted || !isLoggedIn) return null;


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 p-2 md:p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <button
                        className="md:hidden text-gray-600 hover:text-gray-900"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? '✕' : '☰'}
                    </button>
                    <h1 className="text-2xl font-bold text-center text-gray-800 flex-1">پیام های من</h1>
                </div>

                <div className="flex h-[calc(100vh-6rem)]">
                    {/* Sidebar */}
                    <div className={`${
                        sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                    } fixed md:relative md:w-80 right-0 top-0 h-full bg-gray-50 border-l transform transition-transform duration-300 ease-in-out md:transform-none z-50`}>
                        <div className="p-4 h-full overflow-y-auto">
                            {/* Role Selection Buttons */}
                            <div className="flex flex-col gap-2 mb-4">
                                <button
                                    onClick={FreelancerMessage}
                                    className={`flex items-center justify-center p-3 rounded-lg font-medium transition-all ${
                                        freelancerM ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">💬</span>
                                    پیام های فریلنسری
                                </button>
                                <button
                                    onClick={KarfarmaMessageToggle}
                                    className={`flex items-center justify-center p-3 rounded-lg font-medium transition-all ${
                                        karfarmaM ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">💬</span>
                                    پیام های کارفرمایی
                                </button>
                            </div>

                            {/* Message Lists */}
                            <div className="h-full overflow-y-auto">
                                {freelancerM && (
                                    <FreelancerM onSuggestionClick={(suggestion) => {
                                        handleSuggestionClick(suggestion);
                                        setSidebarOpen(false);
                                    }} />
                                )}
                                {karfarmaM && (
                                    <KarfarmaM onSuggestionClick={(suggestion) => {
                                        handleSuggestionClick(suggestion);
                                        setSidebarOpen(false);
                                    }} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col h-full">
                        {selectedSuggestion ? (
                            <>
                                {/* Project Info */}
                                <div className="p-4 bg-white border-b">
                                    <h3 className="text-lg font-bold mb-2">{selectedSuggestion.subject}</h3>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>قیمت: {selectedSuggestion.price} تومان</span>
                                        <span>مدت زمان: {selectedSuggestion.deadline} روز</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{selectedSuggestion.description}</p>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 bg-gray-50" ref={messagesEndRef}>
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <div className="animate-spin">⌛</div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {chatMessages.map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex ${
                                                        msg.senderRole === "freelancer"
                                                            ? "justify-start"
                                                            : msg.senderRole === "system"
                                                                ? "justify-center"
                                                                : "justify-end"
                                                    }`}
                                                >
                                                    <div className={`max-w-[70%] rounded-xl p-3 shadow ${
                                                        msg.senderRole === "freelancer"
                                                            ? "bg-blue-500 text-white"
                                                            : msg.senderRole === "system"
                                                                ? "bg-yellow-100 text-gray-800"
                                                                : "bg-gray-200 text-gray-800"
                                                    }`}>
                                                        <p className="mb-1 break-words">{msg.content}</p>
                                                        <span className={`text-xs ${
                                                            msg.senderRole === "freelancer"
                                                                ? "text-blue-100"
                                                                : "text-gray-600"
                                                        }`}>
                                                            {msg.senderRole === "freelancer" ? "فریلنسر" :
                                                                msg.senderRole === "employer" ? "کارفرما" : "هوش مصنوعی"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white border-t">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="پیام خود را بنویسید..."
                                            disabled={isLoading}
                                        />

                                        {userRole === "employer" && (
                                            <button
                                                onClick={toggleAi}
                                                disabled={isLoading}
                                                className={`p-2 rounded-lg ${
                                                    isLoading
                                                        ? 'bg-gray-300'
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                            >
                                                {aiLocked ? '🔒' : '🔓'}
                                            </button>
                                        )}

                                        <button
                                            onClick={sendMessage}
                                            disabled={isLoading || !message.trim()}
                                            className={`p-2 rounded-lg transition-all ${
                                                isLoading || !message.trim()
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                            }`}
                                        >
                                            ➤
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center bg-gray-50">
                                <div className="text-center text-gray-500">
                                    <div className="text-4xl mb-4">💬</div>
                                    <p>لطفا یک پیشنهاد پروژه را برای شروع گفتگو انتخاب کنید</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;