import React from 'react';
import loadingImage from '../assets/LoadingScreen.png'; 

const LoadingScreen = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f3f5f9', 
    }}>
      <img src={loadingImage} alt="Loading" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export default LoadingScreen;
