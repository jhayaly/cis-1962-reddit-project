/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { HiReply } from 'react-icons/hi';
import axios from 'axios';
import ReplyForm from './replyform';
import { animated } from 'react-spring';


const PostStream = ({ post, onDelete }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [gptAnswer, setGptAnswer] = useState('');
  const [deleterror, setDelError] = useState(null);

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(`/api/questions/answers/${post._id}`);
      setAnswers(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching answers:', error);
    }
  };

  const animateAnswer = async () => {
    try {
      const gptAnswerText = post.gptAnswer;
      for (let i = 0; i < gptAnswerText.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 25));
        setGptAnswer(gptAnswerText.slice(0, i + 1));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error animating answer:', error);
    }
  };

  useEffect(() => {
    fetchAnswers();
    animateAnswer();
  }, []);

  const handleAnswerSubmit = async (newReply) => {
    try {
      setReplyOpen(false);
      await axios.post(`/api/questions/answer/${post._id}`, { answer: newReply.text });
      fetchAnswers(); 
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting answer:', error);
    }
  };
  

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/questions/${post._id}`);
      onDelete(post._id);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setDelError(error.response.data.message);
      } else {
        setDelError('An unexpected error occurred.');
      }
      // eslint-disable-next-line no-console
      console.error('Error deleting post:', error);
    }
  };

return (
  <li className="media" style={{ width: '1000px' }}>
    <div className="media-content post-container">
      <p className="is-size-4 has-text-weight-bold has-text-link">Title: {post.title}</p>
      <p className="has-text-link is-size-5">Author: {post.author}</p>
      <p className="has-text-black has-text-weight-bold is-size-5">Question: {post.questionText}</p>
      <div className="gpt-answer" style={{ borderTop: '1px solid #ccc' }}>
          <animated.p className="has-text-black">{gptAnswer}</animated.p>
      </div>      
      <button className="button is-danger is-light is-small" onClick={handleDelete}>Delete</button>
      {answers.map((answer, index) => (
        <div key={index} className="ml-6">
          <p className="has-text-black is-size-5">{answer}</p>
        </div>
      ))}
      {!replyOpen && (
        <button
          type="button"
          onClick={() => setReplyOpen(true)}
          className="button is-primary is-outlined is-small"
        >
          <HiReply />
          Reply
        </button>
      )}
      {replyOpen && (
        <ReplyForm onSubmit={handleAnswerSubmit} onCancel={() => setReplyOpen(false)} />
      )}
    </div>
    {deleterror && <div className="has-text-danger">{deleterror}</div>}
  </li>
);
};


export default PostStream;

