/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './newform';
import PostStream from './poststream';
import { useParams } from 'react-router-dom'; 


const Category = () => { 
  const [posts, setPosts] = useState([]);
  const {category} = useParams()

  useEffect(() => {
    const intervalId = setInterval(() => {
        axios.get('/api/questions/questions')
          .then(response => setPosts(response.data))
          .catch(error => console.error('Error fetching posts:', error));
      }, 2000);
      return () => clearInterval(intervalId);
  }, []);

  const handlePostSubmit = async (newPost) => {
    try {
      await axios.post('/api/questions/add', { 
        questionText: newPost, 
        answer: null,
        author: null,
        category: category
      }); 
      setPosts((prevPosts) => [...prevPosts, newPost]);
    } catch (err) {
      console.error('Error posting:', err.response);
    }
  };

  const handlePostDelete = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <header className="header">
      <div className="mb-4">
          <div>
            <h2 className="title is-3 has-text-black has-text-weight-bold mb-2">Post Form</h2>
            <PostForm
              onSubmit={handlePostSubmit}
              clear
            />
          </div>
        <h2 className="title is-3 has-text-black has-text-weight-bold mb-2"> {category} Post Stream</h2>
          <ul className="posts-list">
            {posts.map((post, index) => ( 
                (post.category === category) &&
              <PostStream post={post} key={index} onDelete={handlePostDelete}/> 
            ))}
          </ul>
      </div>
    </header>
  );
};

export default Category;
