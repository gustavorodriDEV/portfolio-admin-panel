import React, { useState } from "react";
import axios from "axios";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const adminUrl = process.env.REACT_APP_ADMIN_URL_LOGIN;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(adminUrl, { email, senha });
      console.log("Dados recebidos:", response.data);
      localStorage.setItem("token", response.data);
      alert("Login realizado com sucesso!");

      setEmail("");
      setSenha("");

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
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
      <h1>Login Admin</h1>

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginAdmin;
