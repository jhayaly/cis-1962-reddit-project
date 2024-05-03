import express from 'express';
import requireAuth from '../middlewares/require-auth';
import Question from '../models/question';
import processQuestion from 'gpt_package'; //this will work when it is installed

const router = express.Router();

router.get('/questions', async (req, res, next) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (err) {
    next(err);
  }
});

router.post('/add', requireAuth, async (req, res, next) => {
  const { questionText, category } = req.body;
  const actualAuthor = req.session?.user.email;
  try {
    const gptAnswer = await processQuestion(questionText as string) || 'GPT-4 has no answer to your question!';
    const newQuestion = new Question({ questionText: questionText.text, title: questionText.title, 
    author: actualAuthor, gptAnswer: gptAnswer, category: category,  answers: []});
    await newQuestion.save();
    res.status(201).json({ message: 'Question added', question: newQuestion });
  } catch (err) {
    next(err);
  }
});

router.post('/answer/:postId', requireAuth, async (req, res, next) => {
  const { answer } = req.body;
  const postId = req.params.postId;

  try {
    const question = await Question.findOne({ _id: postId });
    if (question) {
      question!.answers!.push(answer);
      await question!.save();
      return res.status(201).json({ message: 'Question answered', question: question });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:postId', requireAuth, async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const question = await Question.findOne({ _id: postId });
    if (question?.author === req!.session!.user.email) {
      const deleteQ = await Question.deleteOne({ _id: postId });
      if (deleteQ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.status(201).json({ message: 'Question deleted', question: question });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } else {
      res.status(409).json({ message: 'Can not delete a post you did not write!' });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/answers/:postId', async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const answer = await Question.findOne({ _id : postId });
    return answer ? res.status(200).json(answer?.answers) : 
    res.status(404).json({ message: 'Post not found' });
  } catch (err) {
    next(err);
  }
});

export default router;