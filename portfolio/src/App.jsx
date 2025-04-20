import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importando suas páginas
import CadastroAdmin from "./pages/CadastroAdmin";
import LoginAdmin from "./pages/LoginAdmin";
import AreaAdministrativa from "./pages/AreaAdministrativa";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<CadastroAdmin />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/admin" element={<AreaAdministrativa />} />
        {/* Rota padrão caso queira uma Home futuramente */}
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
