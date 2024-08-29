import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import helpIcon from '../assets/help-icon.png';
import Logo from '../assets/white-logo.png';

const SignUpUnitInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [unitCount, setUnitCount] = useState(3); // Default value
  const [units, setUnits] = useState([]);
  const [showHelp, setShowHelp] = useState({});

  useEffect(() => {
    const newUnits = Array.from({ length: unitCount }, (_, index) => (
      units[index] || {
        title: '',
        address: '',
        tenantName: '',
        tenantEmail: '',
        notes: '',
      }
    ));
    setUnits(newUnits);
  }, [unitCount]);

  const handleUnitChange = (index, field, value) => {
    const newUnits = [...units];
    newUnits[index][field] = value;
    setUnits(newUnits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the account page
    navigate('/account');
  };

  return (
    <div className="bg-[#F3F5F9] min-h-screen flex flex-col items-center pt-[128px] px-8">
      {/* Header Section */}
      <header className="w-full h-[96px] bg-[#0466c8] flex items-center justify-center fixed top-0 left-0">
        <img src={Logo} alt="Logo" className="w-[43.66px] h-[48px]" />
      </header>

      <div className="mt-[32px] w-[366px]">
        <h1 className="text-heading-3 font-bold text-text-primary mb-4">
          Please enter unit details
        </h1>
        <label htmlFor="unitCount" className="block text-[#333333] mb-2 text-base font-normal">
          How many units do you have?
        </label>
        <p className="text-[#757575] mb-6">
          A unit is a single dwelling for tenants, such as an apartment.
        </p>
      </div>

      <div className="relative mb-6 w-[366px]">
        <select
          id="unitCount"
          className="w-full h-10 pl-4 pr-8 py-2 bg-white rounded-lg border border-[#d9d9d9] appearance-none"
          value={unitCount}
          onChange={(e) => setUnitCount(Number(e.target.value))}
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1} className="text-[#1e1e1e] text-base font-normal leading-snug">
              {i + 1} units
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-[#0466c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {units.map((unit, index) => (
        <div key={index} className="bg-white p-6 mb-6 rounded-lg border border-[#d9d9d9] w-[366px] h-[600px]">
          <h2 className="text-heading-3 font-bold text-text-primary mb-2">Unit #{index + 1}</h2>
          <label htmlFor={`unitTitle-${index}`} className="block text-[#333333] mb-2">Unit Title</label>
          <input
            type="text"
            id={`unitTitle-${index}`}
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
            placeholder="Enter your unit's title"
            value={unit.title}
            onChange={(e) => handleUnitChange(index, 'title', e.target.value)}
          />

          <label htmlFor={`unitAddress-${index}`} className="block text-[#333333] mb-2">Unit Address</label>
          <input
            type="text"
            id={`unitAddress-${index}`}
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
            placeholder="Enter your unit's address"
            value={unit.address}
            onChange={(e) => handleUnitChange(index, 'address', e.target.value)}
          />

          <label htmlFor={`tenantName-${index}`} className="block text-[#333333] mb-2">Primary Tenant Name</label>
          <input
            type="text"
            id={`tenantName-${index}`}
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
            placeholder="Enter your primary tenant's name"
            value={unit.tenantName}
            onChange={(e) => handleUnitChange(index, 'tenantName', e.target.value)}
          />

          <div className="flex items-center mb-2">
            <label htmlFor={`tenantEmail-${index}`} className="block text-[#333333]">Primary Tenant’s Email</label>
            <img
              src={helpIcon}
              alt="Help Icon"
              className="w-4 h-4 cursor-pointer ml-2"
              onClick={() => setShowHelp({ ...showHelp, [index]: !showHelp[index] })}
            />
          </div>
          {showHelp[index] && (
            <p className="text-[#5C5D6D] mb-2">
              This email ensures that maintenance requests from this unit are routed correctly to you through FixTrackr.
            </p>
          )}
          <input
            type="email"
            id={`tenantEmail-${index}`}
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
            placeholder="Enter your primary tenant's email"
            value={unit.tenantEmail}
            onChange={(e) => handleUnitChange(index, 'tenantEmail', e.target.value)}
          />

          <label htmlFor={`notes-${index}`} className="block text-[#333333] mb-2">Notes About Unit</label>
          <textarea
            id={`notes-${index}`}
            className="w-full p-3 mb-4 text-[#333333] border border-[#d9d9d9] rounded-[8px]"
            placeholder="Notes"
            value={unit.notes}
            onChange={(e) => handleUnitChange(index, 'notes', e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full py-3 text-white bg-primary rounded-[25px] mb-[173px]"
      >
        Finish
      </button>
    </div>
  );
};

export default SignUpUnitInfo;
