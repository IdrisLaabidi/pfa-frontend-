import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.reload();
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
    localStorage.removeItem("token") ;
    
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