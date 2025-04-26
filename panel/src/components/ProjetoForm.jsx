import React, { useState } from "react";
import api from "../services/axios";

const projetosUrl = process.env.REACT_APP_PROJETOS_URL;
const uploadImgProjetoUrl = process.env.REACT_APP_UPLOAD_IMG_PROJETO_URL;

export default function ProjetoForm() {
  const [projeto, setProjeto] = useState({
    titulo: "",
    descricao: "",
    linkGithub: "",
    linkHospedado: "",
    imagemUrl: ""
  });
  const [fileProjeto, setFileProjeto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let caminhoImagem = projeto.imagemUrl;
      if (fileProjeto) {
        const formData = new FormData();
        formData.append("file", fileProjeto);
        const resUpload = await api.post(uploadImgProjetoUrl, formData);
        caminhoImagem = resUpload.data;
        if (!caminhoImagem) {
          alert("Erro: caminho da imagem não foi retornado.");
          return;
        }
      }

      const novoProjeto = { ...projeto, imagemUrl: caminhoImagem };
      await api.post(projetosUrl, novoProjeto);
      alert("Projeto cadastrado com sucesso!");
      setProjeto({ titulo: "", descricao: "", linkGithub: "", linkHospedado: "", imagemUrl: "" });
      setFileProjeto(null);
    } catch (error) {
      console.error("Erro ao cadastrar projeto:", error);
      alert("Erro ao cadastrar projeto.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome do Projeto:</label><br />
        <input
          type="text"
          name="titulo"
          value={projeto.titulo}
          onChange={(e) => setProjeto({ ...projeto, titulo: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Descrição:</label><br />
        <textarea
          name="descricao"
          value={projeto.descricao}
          onChange={(e) => setProjeto({ ...projeto, descricao: e.target.value })}
          rows={4}
          required
        />
      </div>
      <div>
        <label>Link GitHub:</label><br />
        <input
          type="url"
          name="linkGithub"
          value={projeto.linkGithub}
          onChange={(e) => setProjeto({ ...projeto, linkGithub: e.target.value })}
        />
      </div>
      <div>
        <label>Link Deploy:</label><br />
        <input
          type="url"
          name="linkHospedado"
          value={projeto.linkHospedado}
          onChange={(e) => setProjeto({ ...projeto, linkHospedado: e.target.value })}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label>Imagem do Projeto:</label><br />
        <input type="file" accept="image/*" onChange={(e) => setFileProjeto(e.target.files[0])} required />
      </div>
      {fileProjeto && (
        <div style={{ marginTop: "1rem" }}>
          <label>Prévia da Imagem:</label><br />
          <img src={URL.createObjectURL(fileProjeto)} alt="Preview" width="120" height="80" />
        </div>
      )}
      <button type="submit" style={{ marginTop: "1.5rem" }}>Salvar Projeto</button>
    </form>
  );
}
