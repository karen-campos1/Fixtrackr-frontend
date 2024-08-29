import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import helpIcon from '../assets/help-icon.png';
import chevronLeft from '../assets/left-chevron.png';

const AddUnit = ({ existingUnitsCount }) => {
  const [formData, setFormData] = useState({
    unitTitle: '',
    unitAddress: '',
    primaryTenant: '',
    primaryTenantEmail: '',
    notes: ''
  });

  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();
  const unitNumber = existingUnitsCount + 1;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the API call to add a new unit
    try {
      // Example API call to add the unit
      await fetch('/api/add-unit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      navigate('/account'); // Navigate back to the account page
    } catch (error) {
      console.error('Error adding unit:', error);
    }
  };

  return (
    <div style={{ background: '#F3F5F9', padding: '32px' }}>
      <div style={{ background: '#0466C8', height: '96px', width: '100%' }}>
        <img
          src={chevronLeft}
          alt="Back"
          style={{ width: '24px', height: '24px', cursor: 'pointer' }}
          onClick={() => navigate('/account')}
        />
      </div>
      <form onSubmit={handleSubmit} style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', marginTop: '27.5px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#333333' }}>Unit #{unitNumber}</h1>
        <label>
          Unit Title
          <input type="text" name="unitTitle" value={formData.unitTitle} onChange={handleChange} placeholder="Enter your unit's title" />
        </label>
        <label>
          Unit Address
          <input type="text" name="unitAddress" value={formData.unitAddress} onChange={handleChange} placeholder="Enter your unit's address" />
        </label>
        <label>
          Primary Tenant
          <input type="text" name="primaryTenant" value={formData.primaryTenant} onChange={handleChange} placeholder="Enter your primary tenant's name" />
        </label>
        <label style={{ position: 'relative' }}>
          Primary Tenant's Email
          <img
            src={helpIcon}
            alt="Help"
            style={{ width: '16px', height: '16px', cursor: 'pointer', marginLeft: '8px' }}
            onClick={() => setShowHelp(!showHelp)}
          />
          {showHelp && (
            <p style={{ color: '#5C5D6D', fontSize: '14px', margin: '8px 0 0' }}>
              This email ensures that maintenance requests from this unit are routed correctly to you through FixTrackr.
            </p>
          )}
          <input type="email" name="primaryTenantEmail" value={formData.primaryTenantEmail} onChange={handleChange} placeholder="Enter your primary tenant's email" />
        </label>
        <label>
          Notes
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes"></textarea>
        </label>
        <button type="submit" style={{ background: '#0466C8', color: '#FFFFFF', borderRadius: '25px', padding: '16px 0', width: '100%', marginTop: '32px' }}>
          Finish
        </button>
      </form>
    </div>
  );
};

export default AddUnit;
