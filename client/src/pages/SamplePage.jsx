import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth.jsx';
import { useLocation,useNavigate } from 'react-router-dom';

const SamplePage = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate=useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    // const user = JSON.parse(searchParams.get('user'));
    // Set the auth object in local storage
    localStorage.setItem(
      'auth',
      JSON.stringify({ token: token })
    );

    // Set the auth object in the state
    setAuth({ token: token });
    navigate('/')
  }, [location.search]);


  return <div>Sample</div>;
};

export default SamplePage;