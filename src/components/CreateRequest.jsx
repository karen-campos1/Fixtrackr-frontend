import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leftChevronIcon from '../assets/left-chevron.png';
import paperclipIcon from '../assets/paperclip-icon.png'; // Assuming this exists in your assets folder

const CreateRequest = () => {
  const navigate = useNavigate();
  const [unit, setUnit] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [subject, setSubject] = useState('');
  const [notes, setNotes] = useState('');
  const [availability, setAvailability] = useState('');
  const [contractor, setContractor] = useState('');
  const [contractorContact, setContractorContact] = useState('');

  // Hardcoded unit options
  const unitOptions = [
    "123 Main St, unit 100",
    "555 Dallas St, Lemon House",
    "321 Yellow St, Chainey Duplex #A",
    "111 Erick Ave, Unit 11",
  ];

  // Hardcoded status options
  const statusOptions = [
    "Pending",
    "Contractor Called",
    "Appointment Set",
    "Request Complete"
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('Image Uploaded:', file);
  };

  const handleFinish = () => {
    // Handle form submission logic
    console.log({
      unit,
      subject,
      notes,
      availability,
      priority,
      status,
      contractor,
      contractorContact
    });
    // Redirect to task-list
    navigate('/task-list');
  };

  return (
    <div className="bg-[#F3F5F9] min-h-screen pb-24">
      {/* Top Banner */}
      <header className="bg-[#0466C8] h-[96px] flex items-center px-6 relative">
        <img
          src={leftChevronIcon}
          alt="Back"
          className="cursor-pointer absolute left-[17px] top-[24px]"
          onClick={() => navigate('/task-list')}
        />
      </header>

      {/* Form Container */}
      <div className="bg-white p-6 mx-8 mt-8 rounded-lg shadow-lg">
  <div className="bg-[#7BB8FA40] px-0 py-4 -mx-6 -mt-6 rounded-t-lg">
    <h2 className="text-[#005BBD] font-semibold text-[18px] pl-6">
      Property Manager's Input
    </h2>
  </div>

        <div className="mt-4">
          <h3 className="text-[#333333] font-semibold text-[24px]">
            New Request
          </h3>
        </div>

        {/* Unit Dropdown */}
        <div className="mt-6">
          <label className="text-[#333333]">Unit</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="">Select Unit</option>
            {unitOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Subject</label>
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Notes Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Notes</label>
          <textarea
            placeholder="Notes"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* Tenant Availability Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Tenant Availability</label>
          <input
            type="text"
            placeholder="Availability"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>

        {/* Priority Dropdown */}
        <div className="mt-6">
          <label className="text-[#333333]">Set Priority</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="high">High Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="mt-6">
          <label className="text-[#333333]">Current Status</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            {statusOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Contractor Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Contractor</label>
          <input
            type="text"
            placeholder="Contractor"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={contractor}
            onChange={(e) => setContractor(e.target.value)}
          />
        </div>

        {/* Contractor Contact Info Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Contractor's Contact Info</label>
          <input
            type="text"
            placeholder="(000) 000-0000"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={contractorContact}
            onChange={(e) => setContractorContact(e.target.value)}
          />
        </div>

        {/* Attach Images */}
        <div className="mt-6">
          <label style={{ display: 'block', cursor: 'pointer', background: '#F3F5F9', color: '#5C5D6D', padding: '8px 16px', borderRadius: '8px', border: 'none', position: 'relative' }}>
            Attach Images
            <img src={paperclipIcon} alt="Attach" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
          </label>
        </div>

        {/* Finish Button */}
        <button 
          style={{ 
            background: '#0466C8', 
            color: '#FFFFFF', 
            padding: '12px 24px', 
            borderRadius: '25px', 
            border: 'none', 
            cursor: 'pointer', 
            marginTop: '24px', 
            width: '100%' 
          }} 
          onClick={handleFinish}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default CreateRequest;
