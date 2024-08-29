import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for making HTTP requests
import logo from '../assets/FixtrackrLogo.png'; // Adjust path if necessary

const SignUpPersonalInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

     // Log the password and confirm password values
  console.log('Password:', formData.password);
  console.log('Confirm Password:', formData.confirmPassword);

  const trimmedPassword = formData.password.trim();
  const trimmedConfirmPassword = formData.confirmPassword.trim();

  if (trimmedPassword !== trimmedConfirmPassword) {
    console.log({ error: 'Passwords do not match' });
    return;
  }

  // Proceed with form submission
  navigate('/signup-units', { state: { formData } });


    try {
      const response = await axios.post('http://localhost:8000/api/register-property-manager/', formData);
      console.log(response.data);
      navigate('/signup-units', { state: { formData } });
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.error || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F3F5F9] px-8 py-20">
      <img src={logo} alt="FixTrackr Logo" className="w-[75px] h-[83px] mb-[48px]" />
      <div className="bg-white p-[24px] rounded-lg shadow-md w-full max-w-[366px]">
        <h1 className="text-heading-3 font-bold text-[#333333] mb-2">Sign Up</h1>
        <p className="text-text-secondary mb-4">All inputs are required</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="block text-[#333333] mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="lastName" className="block text-[#333333] mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded"
            value={formData.lastName}
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

          <label htmlFor="confirmPassword" className="block text-[#333333] mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full p-3 mb-6 text-[#333333] border border-[#d9d9d9] rounded"
            value={formData.confirmPassword}
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
