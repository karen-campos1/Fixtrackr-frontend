import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/FixtrackrLogo.png';

const AuthPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img src={logo} alt="FixTrackr Logo" className="w-32 h-32 mb-8" />
      <h1 className="text-heading-3 font-medium text-text-primary mb-8 text-center" style={{ width: '311px' }}>
        Welcome to FixTrackr
      </h1>
      <button
        onClick={handleSignUp}
        className="py-3 text-white bg-primary mb-4"
        style={{
          width: '311px',
          height: '54px',
          padding: 'var(--sds-size-space-400) var(--sds-size-space-300)',
          gap: 'var(--sds-size-space-200)',
          borderRadius: '25px 25px 25px 25px',
          border: '2px solid #0466C8',
          opacity: 1,
        }}
      >
        Sign Up
      </button>
      <button
        onClick={handleLogIn}
        className="py-3 text-primary bg-white"
        style={{
          width: '311px',
          height: '54px',
          padding: 'var(--sds-size-space-400) var(--sds-size-space-300)',
          gap: 'var(--sds-size-space-200)',
          borderRadius: '25px 25px 25px 25px',
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
