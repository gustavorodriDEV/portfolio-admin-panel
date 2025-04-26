import React, { useState } from "react";
import api from "../services/axios";


const habilidadeUrl = process.env.REACT_APP_HABILIDADE_URL;
const uploadIconeUrl = process.env.REACT_APP_UPLOAD_URL;

export default function HabilidadeForm() {
  const [habilidade, setHabilidade] = useState({ nome: "", icone: "" });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let caminho = habilidade.icone;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const resUpload = await api.post(uploadIconeUrl, formData);
        caminho = resUpload.data;
      }
      const novaHabilidade = { ...habilidade, icone: caminho };
      await api.post(habilidadeUrl, novaHabilidade);
      alert("Habilidade cadastrada com sucesso!");
      setHabilidade({ nome: "", icone: "" });
      setFile(null);
    } catch (error) {
      console.error("Erro ao cadastrar habilidade:", error);
      alert("Erro ao cadastrar habilidade.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome da habilidade:</label><br />
        <input
          type="text"
          name="nome"
          value={habilidade.nome}
          onChange={(e) => setHabilidade({ ...habilidade, nome: e.target.value })}
          placeholder="Ex: React, Java, Spring Boot"
          required
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label>Ícone da habilidade (upload):</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>
      {file && (
        <div style={{ marginTop: "1rem" }}>
          <label>Prévia do ícone:</label><br />
          <img
            src={URL.createObjectURL(file)}
            alt="Prévia"
            width="40"
            height="40"
            style={{ border: "1px solid #ccc", padding: "4px", borderRadius: "6px" }}
          />
        </div>
      )}
      <button type="submit" style={{ marginTop: "1.5rem" }}>Salvar Habilidade</button>
    </form>
  );
}
