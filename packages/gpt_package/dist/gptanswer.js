"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const client = new openai_1.default({
    apiKey: 'sk-proj-SNrXJbWwlbBrtmAWTk5aT3BlbkFJ3iEcrD8crT8wIcMeb6ht'
});
const processQuestion = async (question) => {
    try {
        //console.log(question);
        const stream = await client.beta.chat.completions.stream({
            model: 'gpt-3.5-turbo-0125',
            messages: [{ role: 'user', content: question.text }],
            stream: true,
            n: 1, // How many chat completion choices to generate
            stop: null, // Up to 4 sequences where the API will stop generating further tokens
            temperature: 1, // Sampling temperature to use, between 0 and 2
            top_p: 1, // An alternative to sampling with temperature
        });
        let response = '';
        for await (const chunk of stream) {
            response += chunk.choices[0]?.delta.content || '';
        }
        const chatCompletion = await stream.finalChatCompletion();
        //console.log('Response:', response.trim());
        return response.trim();
    }
    catch (error) {
        console.error('Error processing question:', error);
        return null;
    }
};
exports.default = processQuestion;
