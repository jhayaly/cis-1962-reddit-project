import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IQuestion {
  questionText: string;
  title: string;
  gptAnswer: string;
  author: string;
  category?: string;
  answers?: string[]
}

// 2. Create a Schema corresponding to the document interface.
const questionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  title: { type: String, required: true },
  gptAnswer: { type: String, required: true },
  author: { type: String, required: true },
  category: { type : String, required: false}, 
  answers: {type: [String], required: false}
});

// 3. Create a Model.
const Question = model<IQuestion>('Question', questionSchema);

export default Question;
