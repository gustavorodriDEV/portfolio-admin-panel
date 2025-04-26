import React, { useEffect, useState } from "react";
import api from "../services/axios";
import "./ContatoForm.css";

import {
  SiInstagram,
  SiLinkedin,
  SiGithub,
  SiWhatsapp,
  SiFacebook
} from "react-icons/si";

const contatoUrl = process.env.REACT_APP_CONTATO_URL;

const iconesDisponiveis = [
  { nome: "Instagram", componente: <SiInstagram />, classe: "SiInstagram" },
  { nome: "LinkedIn", componente: <SiLinkedin />, classe: "SiLinkedin" },
  { nome: "GitHub", componente: <SiGithub />, classe: "SiGithub" },
  { nome: "WhatsApp", componente: <SiWhatsapp />, classe: "SiWhatsapp" },
  { nome: "Facebook", componente: <SiFacebook />, classe: "SiFacebook" }
];

export default function ContatoForm() {
  const [contato, setContato] = useState({ nomeRede: "", url: "", icone: "" });
  const [contatos, setContatos] = useState([]);
  const [mostrarContatos, setMostrarContatos] = useState(false); 

  const buscarContatos = async () => {
    try {
      const response = await api.get(contatoUrl);
      setContatos(response.data);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  };

  useEffect(() => {
    buscarContatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContato({ ...contato, [name]: value });
  };

  const selecionarIcone = (classe) => {
    setContato({ ...contato, icone: classe });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(contatoUrl, contato);
      alert("Contato cadastrado com sucesso!");
      setContato({ nomeRede: "", url: "", icone: "" });
      buscarContatos(); 
    } catch (error) {
      console.error("Erro ao cadastrar contato:", error);
      alert("Erro ao cadastrar contato.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este contato?")) {
      try {
        await api.delete(`${contatoUrl}/${id}`);
        alert("Contato removido com sucesso!");
        buscarContatos(); 
      } catch (error) {
        console.error("Erro ao excluir contato:", error);
        alert("Erro ao excluir contato.");
      }
    }
  };

  const toggleMostrarContatos = () => {
    setMostrarContatos(!mostrarContatos);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Rede:</label><br />
          <input type="text" name="nomeRede" value={contato.nomeRede} onChange={handleChange} required />
        </div>
        <div>
          <label>URL:</label><br />
          <input type="url" name="url" value={contato.url} onChange={handleChange} required />
        </div>
        <div>
          <label>Ícone:</label><br />
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {iconesDisponiveis.map((icone) => (
              <div
                key={icone.classe}
                onClick={() => selecionarIcone(icone.classe)}
                style={{
                  cursor: "pointer",
                  border: contato.icone === icone.classe ? "2px solid #007bff" : "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "8px"
                }}
                title={icone.nome}
              >
                {icone.componente}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Ícone selecionado: </label>
          <strong>{contato.icone || "Nenhum"}</strong>
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Salvar Contato</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />


      <button onClick={toggleMostrarContatos} className="botao-ver-contatos">
        {mostrarContatos ? "Ocultar Contatos" : "Ver Contatos"}
      </button>

      {mostrarContatos && (
        <div>
          <h3>Contatos Cadastrados</h3>
          <ul className="lista-contatos">
            {contatos.map((c) => (
              <li key={c.id} className="item-contato">
                <div>
                  <strong>{c.nomeRede}</strong> - {c.url}
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="botao-excluir"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
