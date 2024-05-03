/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import useLoggedIn from './hooks/use_cat';


const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const { loggedIn } = useLoggedIn();


  useEffect(() => {
    setCategories(["Food", "Accomodation", "Study Tips", "Classes"]);
  }, [setCategories]);

  const navigate = useNavigate();

  const navigateToSignup = ()  => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/account/logout');
      navigateToSignup();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-buttons">
        {loggedIn && (
          <>
            <button className="button is-link is-small" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
      <h2 className="title is-2 has-text-black has-text-weight-bold mb-2">Homepage</h2>
      <div className="mb-4">
        {loggedIn ? (
          <div>
            <h2 className="title is-3 has-text-black has-text-weight-bold mb-2">Categories... What would you like to see today?</h2>
            <ul className="posts-list" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {categories.map((category, index) => ( 
               <Link className="button is-link is-outlined is-medium" to={`/category/${category}`} key = {index}>{category} </Link> 
               ))}
          </ul>
          </div>
        ) : (
          <div className="mb-4">
            <Link className="button is-primary is-fullwidth" to="/signup">Signup</Link>
          </div>
        )}
        <Outlet />
      </div>
    </header>
  );
};

export default HomePage;
