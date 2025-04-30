
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Documentation from './pages/Documentation';
import CreateToken from './pages/CreateToken';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/create-token" element={<CreateToken />} />
      </Routes>
    </Router>
  );
}

export default App;
