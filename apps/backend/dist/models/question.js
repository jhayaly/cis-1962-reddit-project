"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const questionSchema = new mongoose_1.Schema({
    questionText: { type: String, required: true },
    title: { type: String, required: true },
    gptAnswer: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: false },
    answers: { type: [String], required: false }
});
// 3. Create a Model.
const Question = (0, mongoose_1.model)('Question', questionSchema);
exports.default = Question;
