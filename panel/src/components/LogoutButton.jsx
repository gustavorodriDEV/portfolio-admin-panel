import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redireciona para o login
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginTop: "1rem",
        padding: "8px 16px",
        backgroundColor: "#d9534f",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Sair
    </button>
  );
}
