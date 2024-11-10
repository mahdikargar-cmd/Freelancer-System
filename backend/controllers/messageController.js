import axios from "axios";

const askProjectQuestions = async (projectId) => {
    try {
        const response = await axios.post('http://localhost:5001/ask_project_questions', {
            projectId: projectId
        });
        return response.data.responses;
    } catch (error) {
        console.error("Error in askProjectQuestions:", error);
        return [];
    }
};

// در اینجا باید وضعیت قفل شدن AI را بررسی کرده و تغییر دهیم
socket.on("sendMessage", async (message) => {
    const { employerId, projectId, senderRole } = message;

    // وقتی AI قفل باشد، پیام جدیدی از AI ارسال نخواهد شد
    if (message.aiLocked) {
        console.log("AI is locked, no messages from AI are allowed.");
        return;
    }

    // ارسال پیام‌های از AI به کارفرما
    if (senderRole === "system") {
        // ارسال سوالات AI به کارفرما
        const projectQuestions = await askProjectQuestions(projectId);
        projectQuestions.forEach((question) => {
            const questionMessage = {
                content: question,
                senderId: "system",
                receiverId: employerId,
                projectId,
                role: "system",
                aiLocked: true // قفل کردن AI
            };
            socket.emit("receiveMessage", questionMessage);
        });
    }
});
