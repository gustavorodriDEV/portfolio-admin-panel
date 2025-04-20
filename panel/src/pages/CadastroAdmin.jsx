import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈

function CadastroAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate(); // 👈

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const adminUrl = process.env.REACT_APP_ADMIN_URL;

    try {
      const response = await axios.post(adminUrl, { email, senha });
      console.log("Dados recebidos:", response.data);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert(error.response.data);
        } else {
          alert("Erro na resposta do backend: " + error.response.data);
        }
      } else if (error.request) {
        alert("Sem resposta do backend: " + error.request);
      } else {
        alert("Erro ao configurar a requisição: " + error.message);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Cadastro de Admin</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha:</label><br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirmar senha:</label><br />
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroAdmin;
