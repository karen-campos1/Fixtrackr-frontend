import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/FixtrackrLogo.png';

const SignUpPersonalInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);


    const trimmedData = {
      ...formData,
      password: formData.password.trim(),
      confirm_password: formData.confirm_password.trim(),
    };

    console.log('Final Form Data before submission:', trimmedData);

    if (trimmedData.password !== trimmedData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    try {  
        const payload = {
        email: trimmedData.email,
        username: trimmedData.email,
        password: trimmedData.password,
        confirm_password: trimmedData.confirm_password,
        first_name: trimmedData.first_name,
        last_name: trimmedData.last_name,
      };

      console.log('Payload being sent:', payload);

      // Send registration request to the backend
      const response = await axios.post('http://localhost:8000/api/register-property-manager/', payload);
      console.log(response.data);

      // Store tokens in localStorage if needed
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
      }

      // Navigate to the unit signup page, passing along formData
      navigate('/signup-units', { state: { formData: trimmedData } });
    } catch (err) {
      console.error('Error response data:', err.response?.data);
      setError(err.response?.data?.error || 'An error occurred during registration');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F3F5F9] px-8 py-20">
      <img src={logo} alt="FixTrackr Logo" className="w-[75px] h-[83px] mb-[48px]" />
      <div className="bg-white p-[24px] rounded-lg shadow-md w-full max-w-[366px]">
        <h1 className="text-heading-3 font-bold text-[#333333] mb-2">Sign Up</h1>
        <p className="text-text-secondary mb-4">All inputs are required</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first_name" className="block text-[#333333] mb-2">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name" // Changed to match backend
            placeholder="Enter your first name"
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded"
            value={formData.first_name} // Changed to match backend
            onChange={handleInputChange}
            required
          />

          <label htmlFor="last_name" className="block text-[#333333] mb-2">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name" 
            placeholder="Enter your last name"
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded"
            value={formData.last_name} 
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email" className="block text-[#333333] mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password" className="block text-[#333333] mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="confirm_password" className="block text-[#333333] mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password" 
            placeholder="Confirm your password"
            className="w-full p-3 mb-6 text-[#333333] border border-[#d9d9d9] rounded"
            value={formData.confirm_password} 
            onChange={handleInputChange}
            required
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 text-white bg-primary rounded-[25px]"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPersonalInfo;