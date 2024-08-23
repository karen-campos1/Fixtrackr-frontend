import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        // Redirect to dashboard or another authenticated route
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-secondary-bg px-8 py-20">
      <img src="../assets/FixtrackrLogo.png" alt="FixTrackr Logo" className="w-32 h-32 mb-8" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <label htmlFor="email" className="block text-text-primary mb-2">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          className="w-full p-3 mb-6 text-text-primary border border-gray-border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="block text-text-primary mb-2">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="w-full p-3 mb-6 text-text-primary border border-gray-border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 text-white bg-primary rounded"
        >
          Log In
        </button>
        <a href="#" className="block text-center mt-4 text-primary">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
