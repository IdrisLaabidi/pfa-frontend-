import React, { useState, useEffect } from 'react';
import {useNavigate,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';


const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //const [user, setUser] = useState(null);

  
  const logout =()=> {
    Cookies.remove("token") ;
    navigate('/Login');
  }
  return (
    <div>
      <h1>te5dem welweeeeey and Welcome si user with ID !</h1>
      <button onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default HomePage;