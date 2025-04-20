// src/pages/AreaAdministrativa.jsx
import React from "react";
import PerfilForm from "../components/PerfilForm";


export default function AreaAdministrativa() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h2>Área Administrativa</h2>

      <section style={{ marginBottom: "3rem" }}>
        <h3>Perfil</h3>
        <PerfilForm />
      </section>

    </div>
  );
}
