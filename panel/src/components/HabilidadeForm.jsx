import React, { useEffect, useState } from "react";
import api from "../services/axios";
import "./HabilidadeForm.css";

const habilidadeUrl = process.env.REACT_APP_HABILIDADE_URL;
const uploadIconeUrl = process.env.REACT_APP_UPLOAD_URL;

export default function HabilidadeForm() {
  const [habilidade, setHabilidade] = useState({ nome: "", icone: "" });
  const [file, setFile] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  const carregarHabilidades = async () => {
    try {
      const res = await api.get(habilidadeUrl);
      setHabilidades(res.data);
    } catch (error) {
      console.error("Erro ao carregar habilidades:", error);
    }
  };

  useEffect(() => {
    carregarHabilidades();
  }, []);

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
      carregarHabilidades(); // Atualiza lista
    } catch (error) {
      console.error("Erro ao cadastrar habilidade:", error);
      alert("Erro ao cadastrar habilidade.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta habilidade?")) {
      try {
        await api.delete(`${habilidadeUrl}/${id}`);
        alert("Habilidade removida com sucesso!");
        carregarHabilidades(); // Atualiza lista
      } catch (error) {
        console.error("Erro ao excluir habilidade:", error);
        alert("Erro ao excluir habilidade.");
      }
    }
  };

  return (
    <>
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

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => setMostrarLista(!mostrarLista)}
          className="botao-azul"
        >
          {mostrarLista ? "Ocultar Habilidades" : "Mostrar Habilidades"}
        </button>

        {mostrarLista && (
          <>
            <h3>Habilidades Cadastradas</h3>
            <ul className="lista-habilidades">
              {habilidades.map((h) => (
                <li key={h.id} className="item-habilidade">
                    <strong>{h.nome}</strong>
                  <button
                    onClick={() => handleDelete(h.id)}
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
    </>
  );
}
