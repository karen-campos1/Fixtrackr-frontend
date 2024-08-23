import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPersonalInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register-property-manager/', formData);

      if (response.status === 201) {
        // Store tokens and navigate to next step
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        navigate('/signup-units', { state: { formData } });
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-secondary-bg px-8 py-20">
      {/* Form code remains the same */}
      <form onSubmit={handleSubmit}>
        {/* Inputs remain unchanged */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-primary rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default SignUpPersonalInfo;
