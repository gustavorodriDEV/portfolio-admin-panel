// src/pages/AreaAdministrativa.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PerfilForm from "../components/PerfilForm";
import ContatoForm from "../components/ContatoForm";
import HabilidadeForm from "../components/HabilidadeForm";
import ProjetoForm from "../components/ProjetoForm";
import LogoutButton from "../components/LogoutButton";

export default function AreaAdministrativa() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setCarregando(false);
    }
  }, [navigate]);

  if (carregando) {
    return <p>Verificando acesso...</p>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h2>Área Administrativa</h2>

      <section style={{ marginBottom: "3rem" }}>
        <h3>Perfil</h3>
        <PerfilForm />
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h3>Contato</h3>
        <ContatoForm />
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h3>Habilidades</h3>
        <HabilidadeForm />
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h3>Projetos</h3>
        <ProjetoForm />
      </section>

      <LogoutButton />

    </div>
  );
}
