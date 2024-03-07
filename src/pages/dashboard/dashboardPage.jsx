import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login')
    } else {
      validateTokenAndGetUser(token);
    }
  }, [navigate]);

  const validateTokenAndGetUser = async (token) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/validate', {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
      });

      const json = await response.json();
      setUser(json);
     
    } catch (error) {
      console.error('An error occurred:', error);
      navigate('/'); // Redirect to login on error
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Or some loading spinner
  }
  const logout =()=> {
    Cookies.remove("token") ;
    navigate('/Login');
    window.location.reload();
    
  }
  return (
    <div>
      <h1>te5dem welweeeeey and Welcome si user with ID {user}!</h1>
      <button onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default HomePage;