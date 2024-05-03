/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import useLoggedIn from './hooks/use_cat'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { mutateLoggedIn } = useLoggedIn();

  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/');
  };

  const handleSignUp = async () => {
    try {
      await axios.post('/api/account/signup', {
        email: email,
        password: password,
      });
      navigateToHomePage();
      mutateLoggedIn();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div className="container max-w-md mx-auto mt-6 px-3">
      <h2 className="title is-2 has-text-black has-text-centered mb-4">Sign Up</h2>
      <div className="field">
        <div className="post-form flex flex-col">
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
      </div>
      <div className="field">
        <div className="post-form flex flex-col">
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-link is-fullwidth" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
      {error && <div className="has-text-danger">{error}</div>}
      <div className="field">
        <div className="control">
          <Link className="button is-text is-fullwidth" to="/login">Already have an account? Log in!</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
