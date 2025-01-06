import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';
import NavComp from './NavComp';

const AppRoutes = () => {
// Vérifie si un utilisateur est connecté
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Retourne true si le token existe, false sinon
};

// Composant pour les routes protégées
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
            {/* Route protégée */}
      <Route
        path="/predict"
        element={
            <NavComp />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
