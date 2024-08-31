import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftChevronIcon from '../assets/left-chevron.png'; 
import infoIcon from '../assets/info-icon.png';
import paperclipIcon from '../assets/paperclip-icon.png';

const OpenNotification = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showTenantInfo, setShowTenantInfo] = useState(false);

  const handleInfoClick = () => {
    setShowTenantInfo(!showTenantInfo);
  };

  const handleFinish = () => {
    // Logic to save form data and push it to the backend
    // After saving, navigate back to the task list page
    navigate('/task-list');
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    console.log("Uploaded files:", files);
    // You can add logic here to handle file uploads
  };

  return (
    <div style={{ backgroundColor: '#F3F5F9', padding: '24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0466C8', padding: '24px 32px', margin: '-24px -32px 0' }}>
        <img src={leftChevronIcon} alt="Back" style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
      </div>
      
      <div style={{ marginTop: '24px' }}>
        {/* Tenant's Input Section */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{ fontFamily: 'Work Sans', fontSize: '24px', fontWeight: 600, color: '#333333' }}>
              Property A, Unit C
            </h3>
            <img src={infoIcon} alt="Info" style={{ cursor: 'pointer' }} onClick={handleInfoClick} />
          </div>
          {showTenantInfo && (
            <div style={{ marginTop: '16px', color: '#5C5D6D' }}>
              1234 Alpha Way, Santa Barbara, CA 93105<br />
              Primary Email: johnsmith@gmail.com<br />
              Notes: they have a dog (additional fee approved), bathroom floor is already damaged.
            </div>
          )}
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Unit Title</label>
              <input type="text" value="Property A, Unit C" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} disabled />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Subject</label>
              <input type="text" value="Toilet Leak - Started Yesterday" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} disabled />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Tenant’s Message</label>
              <textarea value="The pipe connected to our toilet is starting to drip. I tried tightening it with a wrench but it didn’t work. We need someone to come in ASAP." style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC', minHeight: '120px' }} disabled />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Tenant’s Availability</label>
              <input type="text" value="Monday - Friday 3PM - 6PM" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} disabled />
            </div>
            <button style={{ background: '#F3F5F9', color: '#5C5D6D', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              See Images By Tenant (2)
            </button>
          </div>
        </div>
        
        {/* Property Manager's Input Section */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '12px', padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Set Priority</label>
            <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }}>
              <option value="high" style={{ color: '#DC3545' }}>High Priority</option>
              <option value="low" style={{ color: '#FFC107' }}>Low Priority</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Current Status</label>
            <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }}>
              <option value="received">Received Request</option>
              <option value="read">Request Read</option>
              <option value="called">Contractor Called</option>
              <option value="appointment">Appointment Set</option>
              <option value="complete">Request Complete</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Contractor</label>
            <input type="text" placeholder="Contractor" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Contractor’s Contact Info</label>
            <input type="text" placeholder="(000)000-0000" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 600, color: '#333333' }}>Your Message to Tenant</label>
            <textarea placeholder="Message" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} />
          </div>
          <label style={{ display: 'block', cursor: 'pointer', background: '#F3F5F9', color: '#5C5D6D', padding: '8px 16px', borderRadius: '8px', border: 'none', position: 'relative' }}>
            Attach Images
            <img src={paperclipIcon} alt="Attach" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
          </label>
        </div>

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

export default OpenNotification;