import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import leftChevronIcon from '../assets/left-chevron.png';
import helpIcon from '../assets/help-icon.png';
import { getAccessToken } from '../utils/auth';

const AddNewUnit = () => {
  const navigate = useNavigate();
  const [unit, setUnit] = useState({
    title: '',
    address: '',
    tenantName: '',
    tenantEmail: '',
    notes: '',
  });
  const [showHelp, setShowHelp] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setUnit({ ...unit, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await getAccessToken(); // Get a valid token
      if (!token) {
        throw new Error('No access token found');
      }

      const payload = {
        unit_title: unit.title,
        unit_address: unit.address,
        primary_tenant_name: unit.tenantName,
        primary_tenant_email: unit.tenantEmail,
        notes: unit.notes,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://127.0.0.1:8000/api/units/create/', payload, config);
      console.log('Unit registered:', response.data);

      // Redirect to the account page after unit registration
      navigate('/account');
    } catch (error) {
      console.error('Unit registration failed:', error.response?.data || error.message);
      setError(error.response?.data || 'An error occurred during unit registration');
    }
  };

  return (
    <div style={{ backgroundColor: '#F3F5F9', minHeight: '100vh', padding: '24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0466C8', padding: '24px 32px', margin: '-24px -32px 0' }}>
        <img
          src={leftChevronIcon}
          alt="Go back"
          className="cursor-pointer"
          onClick={() => navigate('/account')}
        />
      </div>

      {/* Inner Container */}
      <div className="mt-[32px] w-[366px] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-heading-3 font-bold text-[#333333] mb-4">Unit Details</h2>

        <label htmlFor="unitTitle" className="block text-[#333333] mb-2">
          Unit Title
        </label>
        <input
          type="text"
          id="unitTitle"
          className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
          placeholder="Enter your unit's title"
          value={unit.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />

        <label htmlFor="unitAddress" className="block text-[#333333] mb-2">
          Unit Address
        </label>
        <input
          type="text"
          id="unitAddress"
          className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
          placeholder="Enter your unit's address"
          value={unit.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />

        <label htmlFor="tenantName" className="block text-[#333333] mb-2">
          Primary Tenant
        </label>
        <input
          type="text"
          id="tenantName"
          className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
          placeholder="Enter your primary tenant's name"
          value={unit.tenantName}
          onChange={(e) => handleInputChange('tenantName', e.target.value)}
        />

        <div className="flex items-center mb-2">
          <label htmlFor="tenantEmail" className="block text-[#333333]">Primary Tenant’s Email</label>
          <img
            src={helpIcon}
            alt="Help Icon"
            className="w-4 h-4 cursor-pointer ml-2"
            onClick={() => setShowHelp(!showHelp)}
          />
        </div>
        {showHelp && (
          <p className="text-[#5C5D6D] mb-2">
            This email ensures that maintenance requests from this unit are routed correctly to you through FixTrackr.
          </p>
        )}
        <input
          type="email"
          id="tenantEmail"
          className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
          placeholder="Enter your primary tenant's email"
          value={unit.tenantEmail}
          onChange={(e) => handleInputChange('tenantEmail', e.target.value)}
        />

        <label htmlFor="notes" className="block text-[#333333] mb-2">Notes</label>
        <textarea
          id="notes"
          className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
          placeholder="Notes"
          value={unit.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 text-white bg-primary rounded-[25px] mt-4"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default AddNewUnit;
