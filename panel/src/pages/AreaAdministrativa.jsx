import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SiInstagram,
  SiLinkedin,
  SiGithub,
  SiWhatsapp,
  SiFacebook
} from "react-icons/si";

const perfilUrl = process.env.REACT_APP_PERFIL_URL;
const contatoUrl = process.env.REACT_APP_CONTATO_URL;
const habilidadeUrl = process.env.REACT_APP_HABILIDADE_URL;
const uploadIconeUrl = process.env.REACT_APP_UPLOAD_URL;
const uploadFotoUrl = process.env.REACT_APP_UPLOAD_FOTO_URL;

const iconesDisponiveis = [
  { nome: "Instagram", componente: <SiInstagram />, classe: "SiInstagram" },
  { nome: "LinkedIn", componente: <SiLinkedin />, classe: "SiLinkedin" },
  { nome: "GitHub", componente: <SiGithub />, classe: "SiGithub" },
  { nome: "WhatsApp", componente: <SiWhatsapp />, classe: "SiWhatsapp" },
  { nome: "Facebook", componente: <SiFacebook />, classe: "SiFacebook" }
];

function AreaAdministrativa() {
  const [perfil, setPerfil] = useState({ nome: "", cargo: "", descricao: "", fotoUrl: "" });
  const [contato, setContato] = useState({ nomeRede: "", url: "", icone: "" });
  const [habilidade, setHabilidade] = useState({ nome: "", icone: "" });

  const [file, setFile] = useState(null); // para habilidade
  const [fileFoto, setFileFoto] = useState(null); // para foto de perfil
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    axios.get(perfilUrl)
      .then((res) => {
        if (res.data.length > 0) {
          setPerfil(res.data[0]);
          setModoEdicao(true);
        }
      })
      .catch(() => console.log("Perfil ainda não cadastrado."));
  }, []);

  const handlePerfilChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleContatoChange = (e) => {
    const { name, value } = e.target;
    setContato({ ...contato, [name]: value });
  };

  const selecionarIcone = (classe) => {
    setContato({ ...contato, icone: classe });
  };

  const handleSubmitPerfil = async (e) => {
    e.preventDefault();
    try {
      let fotoFinal = perfil.fotoUrl;
      if (fileFoto) {
        const formData = new FormData();
        formData.append("file", fileFoto);
        const resUpload = await axios.post(uploadFotoUrl, formData); // <= aqui o erro acontecia
        fotoFinal = resUpload.data;
      }
      const novoPerfil = { ...perfil, fotoUrl: fotoFinal };
      if (modoEdicao) {
        await axios.patch(`${perfilUrl}/${perfil.id}`, novoPerfil);
        alert("Perfil atualizado com sucesso!");
      } else {
        await axios.post(perfilUrl, novoPerfil);
        alert("Perfil cadastrado com sucesso!");
        setModoEdicao(true);
      }
      setFileFoto(null);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      alert("Erro ao salvar perfil");
    }
  };

  const handleSubmitContato = async (e) => {
    e.preventDefault();
    try {
      await axios.post(contatoUrl, contato);
      alert("Contato cadastrado com sucesso!");
      setContato({ nomeRede: "", url: "", icone: "" });
    } catch (error) {
      console.error("Erro ao cadastrar contato:", error);
      alert("Erro ao cadastrar contato.");
    }
  };

  const handleSubmitHabilidade = async (e) => {
    e.preventDefault();
    try {
      let caminho = habilidade.icone;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const resUpload = await axios.post(uploadIconeUrl, formData);
        caminho = resUpload.data;
      }
      const novaHabilidade = { ...habilidade, icone: caminho };
      await axios.post(habilidadeUrl, novaHabilidade);
      alert("Habilidade cadastrada com sucesso!");
      setHabilidade({ nome: "", icone: "" });
      setFile(null);
    } catch (error) {
      console.error("Erro ao cadastrar habilidade:", error);
      alert("Erro ao cadastrar habilidade.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h2>Área Administrativa</h2>
      {/* PERFIIL */}
      <section style={{ marginBottom: "3rem" }}>
        <h3>Perfil</h3>
        <form onSubmit={handleSubmitPerfil}>
          <div>
            <label>Nome:</label><br />
            <input type="text" name="nome" value={perfil.nome} onChange={handlePerfilChange} required />
          </div>
          <div>
            <label>Cargo:</label><br />
            <input type="text" name="cargo" value={perfil.cargo} onChange={handlePerfilChange} required />
          </div>
          <div>
            <label>Descrição:</label><br />
            <textarea name="descricao" value={perfil.descricao} onChange={handlePerfilChange} rows={4} required />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label>Foto do Perfil (upload):</label><br />
            <input type="file" accept="img/*" onChange={(e) => setFileFoto(e.target.files[0])} required={!modoEdicao} />
          </div>
          {fileFoto && (
            <div style={{ marginTop: "1rem" }}>
              <label>Prévia da nova foto:</label><br />
              <img src={URL.createObjectURL(fileFoto)} alt="Prévia" width="100" height="100" style={{ border: "1px solid #ccc", padding: "4px", borderRadius: "8px", objectFit: "cover" }} />
            </div>
          )}
          {!fileFoto && perfil.fotoUrl && (
            <div style={{ marginTop: "1rem" }}>
              <label>Foto atual:</label><br />
              <img src={`http://localhost:8080/${perfil.fotoUrl}`} alt="Foto atual" width="100" height="100" style={{ border: "1px solid #ccc", padding: "4px", borderRadius: "8px", objectFit: "cover" }} />
            </div>
          )}
          <button type="submit" style={{ marginTop: "1rem" }}>{modoEdicao ? "Atualizar Perfil" : "Cadastrar Perfil"}</button>
        </form>
      </section>

      {/* CONTATO */}
      <section style={{ marginBottom: "3rem" }}>
        <h3>Cadastrar Contato</h3>
        <form onSubmit={handleSubmitContato}>
          <div>
            <label>Nome da Rede:</label><br />
            <input type="text" name="nomeRede" value={contato.nomeRede} onChange={handleContatoChange} required />
          </div>
          <div>
            <label>URL:</label><br />
            <input type="url" name="url" value={contato.url} onChange={handleContatoChange} required />
          </div>
          <div>
            <label>Ícone:</label>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {iconesDisponiveis.map((icone) => (
                <div key={icone.classe} onClick={() => selecionarIcone(icone.classe)} style={{ cursor: "pointer", border: contato.icone === icone.classe ? "2px solid #007bff" : "1px solid #ccc", padding: "8px", borderRadius: "8px" }} title={icone.nome}>
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
      </section>

      {/* HABILIDADE */}
      <section>
        <h3>Cadastrar Habilidade</h3>
        <form onSubmit={handleSubmitHabilidade}>
          <div>
            <label>Nome da habilidade:</label><br />
            <input type="text" name="nome" value={habilidade.nome} onChange={(e) => setHabilidade({ ...habilidade, nome: e.target.value })} placeholder="Ex: React, Java, Spring Boot" required />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label>Ícone da habilidade (upload):</label><br />
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
          {file && (
            <div style={{ marginTop: "1rem" }}>
              <label>Prévia do ícone:</label><br />
              <img src={URL.createObjectURL(file)} alt="Prévia" width="40" height="40" style={{ border: "1px solid #ccc", padding: "4px", borderRadius: "6px" }} />
            </div>
          )}
          <button type="submit" style={{ marginTop: "1.5rem" }}>Salvar Habilidade</button>
        </form>
      </section>
    </div>
  );
}

export default AreaAdministrativa;
