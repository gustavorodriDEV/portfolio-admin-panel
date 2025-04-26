import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/axios";

const perfilUrl = process.env.REACT_APP_PERFIL_URL;
const uploadFotoUrl = process.env.REACT_APP_UPLOAD_FOTO_URL;

export default function PerfilForm() {
  const [perfil, setPerfil] = useState({ nome: "", cargo: "", descricao: "", fotoUrl: "" });
  const [fileFoto, setFileFoto] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    axios.get(perfilUrl)
      .then(res => {
        if (res.data.length > 0) {
          setPerfil(res.data[0]);
          setModoEdicao(true);
        }
      })
      .catch(() => console.log("Perfil ainda não cadastrado."));
  }, []);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fotoFinal = perfil.fotoUrl;
      if (fileFoto) {
        const formData = new FormData();
        formData.append("file", fileFoto);
        const resUpload = await api.post(uploadFotoUrl, formData);
        fotoFinal = resUpload.data;
      }

      const novoPerfil = { ...perfil, fotoUrl: fotoFinal };
      if (modoEdicao) {
        await axios.patch(`${perfilUrl}/${perfil.id}`, novoPerfil);
        alert("Perfil atualizado com sucesso!");
      } else {
        await api.post(perfilUrl, novoPerfil);
        alert("Perfil cadastrado com sucesso!");
        setModoEdicao(true);
      }
      setFileFoto(null);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      alert("Erro ao salvar perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label><br />
        <input type="text" name="nome" value={perfil.nome} onChange={handleChange} required />
      </div>
      <div>
        <label>Cargo:</label><br />
        <input type="text" name="cargo" value={perfil.cargo} onChange={handleChange} required />
      </div>
      <div>
        <label>Descrição:</label><br />
        <textarea name="descricao" value={perfil.descricao} onChange={handleChange} rows={4} required />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label>Foto do Perfil:</label><br />
        <input type="file" accept="image/*" onChange={(e) => setFileFoto(e.target.files[0])} required={!modoEdicao} />
      </div>
      {fileFoto && (
        <div style={{ marginTop: "1rem" }}>
          <label>Prévia:</label><br />
          <img src={URL.createObjectURL(fileFoto)} alt="Prévia" width="100" height="100" />
        </div>
      )}
      {!fileFoto && perfil.fotoUrl && (
        <div style={{ marginTop: "1rem" }}>
          <label>Foto atual:</label><br />
          <img src={`http://localhost:8080/${perfil.fotoUrl}`} alt="Atual" width="100" height="100" />
        </div>
      )}
      <button type="submit" style={{ marginTop: "1rem" }}>{modoEdicao ? "Atualizar Perfil" : "Cadastrar Perfil"}</button>
    </form>
  );
}
