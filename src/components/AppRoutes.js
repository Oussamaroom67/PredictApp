import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

const AppRoutes = () => {
  

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      
    </Routes>
  );
};

export default AppRoutes;
