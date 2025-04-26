import React from "react";
import { Navigate } from "react-router-dom";

const RotaPrivada = ({ children }) => {
    const token = localStorage.getItem("token");
    console.log("Token verificado:", token);
    
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RotaPrivada;
