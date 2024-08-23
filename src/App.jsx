// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import SignUpPersonalInfo from './components/SignUpPersonalInfo';
import SignUpUnitInfo from './components/SignUpUnitInfo';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPersonalInfo />} />
        <Route path="/signup-units" element={<SignUpUnitInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
