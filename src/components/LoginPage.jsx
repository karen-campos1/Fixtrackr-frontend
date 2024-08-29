import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { email, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/task-card-list');
    } catch (error) {
      console.error('Login failed:', error.response?.data);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F3F5F9] px-[32px]">
      <div className="mt-[79px] mb-[49px]">
        <img src="/src/assets/FixtrackrLogo.png" alt="FixTrackr Logo" className="w-[149.81px] h-[164.72px]" />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[366px]">
        <label htmlFor="email" className="block text-[#333333] mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full p-3 mb-6 text-[#333333] border border-gray-border rounded-[8px]"
        />
        <label htmlFor="password" className="block text-[#333333] mb-2">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-3 mb-6 text-[#333333] border border-gray-border rounded-[8px]"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 text-white bg-primary rounded-[25px]"
        >
          Log In
        </button>
        <a href="#" className="block text-center mt-4 text-[#333333] underline">
          Forgot password?
        </a>
      </div>
      <div className="mb-[292px]"></div>
    </div>
  );
};

export default LoginPage;
