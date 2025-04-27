import React, { useEffect, useState } from "react";
import api from "../services/axios";
import "./ProjetoForm.css";

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
  const [projetos, setProjetos] = useState([]);
  const [mostrarProjetos, setMostrarProjetos] = useState(false);

  useEffect(() => {
    buscarProjetos();
  }, []);

  const buscarProjetos = async () => {
    try {
      const res = await api.get(projetosUrl);
      setProjetos(res.data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let caminhoImagem = projeto.imagemUrl;
      if (fileProjeto) {
        const formData = new FormData();
        formData.append("file", fileProjeto);
        const resUpload = await api.post(uploadImgProjetoUrl, formData);
        caminhoImagem = resUpload.data;
      }

      const novoProjeto = { ...projeto, imagemUrl: caminhoImagem };
      await api.post(projetosUrl, novoProjeto);
      alert("Projeto cadastrado com sucesso!");
      setProjeto({ titulo: "", descricao: "", linkGithub: "", linkHospedado: "", imagemUrl: "" });
      setFileProjeto(null);
      buscarProjetos();
    } catch (error) {
      console.error("Erro ao cadastrar projeto:", error);
      alert("Erro ao cadastrar projeto.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      try {
        await api.delete(`${projetosUrl}/${id}`);
        alert("Projeto excluído com sucesso!");
        buscarProjetos();
      } catch (error) {
        console.error("Erro ao excluir projeto:", error);
        alert("Erro ao excluir projeto.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario-projeto">
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
        <div className="upload-container">
          <label>Imagem do Projeto:</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFileProjeto(e.target.files[0])}
            required
          />
        </div>
        {fileProjeto && (
          <div className="preview-container">
            <label>Prévia da Imagem:</label><br />
            <img src={URL.createObjectURL(fileProjeto)} alt="Preview" width="120" height="80" />
          </div>
        )}
        <button type="submit" className="botao-salvar">Salvar Projeto</button>
      </form>

      {/* Botão para mostrar projetos */}
      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => setMostrarProjetos(!mostrarProjetos)} className="botao-mostrar">
          {mostrarProjetos ? "Ocultar Projetos" : "Mostrar Projetos"}
        </button>

        {mostrarProjetos && (
          <>
            <h3>Projetos Cadastrados</h3>
            <ul className="lista-projetos">
              {projetos.map((p) => (
                <li key={p.id} className="item-projeto">
                  <div>
                    <strong>{p.titulo}</strong> - {p.descricao}
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="botao-excluir"
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
