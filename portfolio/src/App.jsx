// Importa o React e o sistema de rotas do React Router
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importa a página de cadastro que você acabou de criar
import CadastroAdmin from "./pages/CadastroAdmin";

function App() {
  return (
    // O Router permite trocar de páginas sem recarregar o site
    <Router>
      <Routes>
        {/* Quando acessar /cadastro, mostra o componente CadastroAdmin */}
        <Route path="/cadastro" element={<CadastroAdmin />} />
      </Routes>
    </Router>
  )
}

// Exporta o componente App principal
export default App;
