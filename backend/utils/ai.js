const axios = require('axios');

async function askProjectQuestions(projectId) {
    try {
        const response = await axios.post('http://localhost:5001/ask_project_questions', {
            projectId: projectId
        });
        return response.data.responses;
    } catch (error) {
        console.error("Error in askProjectQuestions:", error);
        return [];
    }
}

module.exports = {askProjectQuestions};
