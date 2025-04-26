import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
import CadastroAdmin from "./pages/CadastroAdmin";
import LoginAdmin from "./pages/LoginAdmin";
import AreaAdministrativa from "./pages/AreaAdministrativa";

// Proteção
import RotaPrivada from "./routes/RotaPrivada";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<CadastroAdmin />} />
        <Route path="/login" element={<LoginAdmin />} />
        
        <Route
          path="/admin"
          element={
            <RotaPrivada>
              <AreaAdministrativa />
            </RotaPrivada>
          }
        />

        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
