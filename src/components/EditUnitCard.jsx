import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftChevronIcon from '../assets/left-chevron.png'; 

const EditUnitCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const unitDetails = {
    unitNumber: id,
    unitTitle: "Property A, Unit A",
    unitAddress: "1234 Alpha Way, Santa Barbara, CA",
    primaryTenant: "John Smith",
    tenantEmail: "johnsmith@gmail.com",
    notes: "they have a dog (additional fee approved), bathroom floor is already damaged."
  };

  const [formData, setFormData] = useState({
    unitTitle: unitDetails.unitTitle || '',
    unitAddress: unitDetails.unitAddress || '',
    primaryTenant: unitDetails.primaryTenant || '',
    tenantEmail: unitDetails.tenantEmail || '',
    notes: unitDetails.notes || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFinish = () => {
    console.log('Updated Unit Details:', formData);
    navigate('/account');
  };

  const handleDelete = () => {
    console.log('Delete Unit:', id);
    navigate('/account');
  };

  return (
    <div style={{ backgroundColor: '#F3F5F9', padding: '24px 32px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0466C8', padding: '24px 32px', margin: '-24px -32px 0' }}>
        <img
          src={leftChevronIcon}
          alt="Go back"
          className="cursor-pointer"
          onClick={() => navigate('/account')}
        />
      </div>

      {/* Container for the form */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8" style={{ paddingLeft: '32px', paddingRight: '32px', marginTop: '27.5px' }}>
        <h1 className="text-heading-2 font-bold mb-6 text-primary-text">Unit #{unitDetails.unitNumber}</h1>

        <label className="text-enlarged-text-sb text-primary-text mb-2">Unit Title</label>
        <input
          type="text"
          name="unitTitle"
          value={formData.unitTitle}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Unit Address</label>
        <input
          type="text"
          name="unitAddress"
          value={formData.unitAddress}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Primary Tenant</label>
        <input
          type="text"
          name="primaryTenant"
          value={formData.primaryTenant}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Primary Tenant’s Email</label>
        <input
          type="email"
          name="tenantEmail"
          value={formData.tenantEmail}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
          rows="4"
        />

        {/* Finish button */}
        <button
          onClick={handleFinish}
          className="w-full py-3 text-white bg-[#0466c8] rounded-[25px] mb-4"
          style={{ height: '54px' }}
        >
          Finish
        </button>

        {/* Delete Unit */}
        <button
          onClick={handleDelete}
          className="w-full text-center text-red-600 underline"
        >
          Delete Unit
        </button>
      </div>
    </div>
  );
};

export default EditUnitCard;
