import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/FixtrackrLogo.png';

const AuthPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      });

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        // Redirect to the dashboard or wherever necessary
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img src={logo} alt="FixTrackr Logo" className="w-32 h-32 mb-8" />
      <h1 className="text-heading-3 font-medium text-text-primary mb-8 text-center" style={{ width: '311px' }}>
        Welcome to FixTrackr
      </h1>
      <input id="email" type="email" placeholder="Enter your email" className="w-full p-3 mb-4 text-text-primary border border-gray-border rounded" />
      <input id="password" type="password" placeholder="Enter your password" className="w-full p-3 mb-6 text-text-primary border border-gray-border rounded" />
      <button
        onClick={handleSignUpRedirect}
        className="py-3 text-white bg-primary mb-4"
        style={{
          width: '311px',
          height: '54px',
          padding: 'var(--sds-size-space-400) var(--sds-size-space-300)',
          gap: 'var(--sds-size-space-200)',
          borderRadius: '25px',
          border: '2px solid #0466C8',
          opacity: 1,
        }}
      >
        Sign Up
      </button>
      <button
        onClick={handleLogin}
        className="py-3 text-primary bg-white"
        style={{
          width: '311px',
          height: '54px',
          padding: 'var(--sds-size-space-400) var(--sds-size-space-300)',
          gap: 'var(--sds-size-space-200)',
          borderRadius: '25px',
          border: '2px solid #0466C8',
          opacity: 1,
        }}
      >
        Log In
      </button>
    </div>
  );
};

export default AuthPage;
