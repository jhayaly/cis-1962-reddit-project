"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const require_auth_1 = __importDefault(require("../middlewares/require-auth"));
const question_1 = __importDefault(require("../models/question"));
const gpt_package_1 = __importDefault(require("gpt_package")); //this will work when it is installed
const router = express_1.default.Router();
router.get('/questions', async (req, res, next) => {
    try {
        const questions = await question_1.default.find();
        return res.status(200).json(questions);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
router.post('/add', require_auth_1.default, async (req, res, next) => {
    const { questionText, category } = req.body;
    const actualAuthor = req.session?.user.email;
    try {
        const gptAnswer = await String((0, gpt_package_1.default)(questionText) || 'GPT-4 has no answer to your question!');
        //console.log(typeof(gptAnswer));
        const newQuestion = new question_1.default({ questionText: questionText.text, title: questionText.title,
            author: actualAuthor, gptAnswer: gptAnswer, category: category, answers: [] });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added', question: newQuestion });
    }
    catch (err) {
        console.log("question not added");
        next(err);
    }
});
router.post('/answer/:postId', require_auth_1.default, async (req, res, next) => {
    const { answer } = req.body;
    const postId = req.params.postId;
    try {
        const question = await question_1.default.findOne({ _id: postId });
        if (question) {
            question.answers.push(answer);
            await question.save();
            return res.status(201).json({ message: 'Question answered', question: question });
        }
    }
    catch (err) {
        next(err);
    }
});
router.delete('/:postId', require_auth_1.default, async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const question = await question_1.default.deleteOne({ _id: postId });
        if (question) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res.status(201).json({ message: 'Question deleted', question: question });
        }
        else {
            res.status(404).json({ message: 'Post not found' });
        }
    }
    catch (err) {
        next(err);
    }
});
router.get('/answers/:postId', async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const answer = await question_1.default.findOne({ _id: postId });
        return answer ? res.status(200).json(answer?.answers) :
            res.status(404).json({ message: 'Post not found' });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.default = router;
