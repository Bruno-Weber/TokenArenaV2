import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Documentation from './pages/Documentation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add a route for the Documentation page */}
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

export default App;
