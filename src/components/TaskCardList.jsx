import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import accountIcon from '../assets/account-icon.png';
import notificationIcon from '../assets/notification-icon.png';

const TaskCardList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('open'); // default to "Open" tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ backgroundColor: '#F3F5F9', minHeight: '100vh', padding: '24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0466C8', padding: '24px 32px', margin: '-24px -32px 0', height: '96px' }}>
        <img src={accountIcon} alt="Account" style={{ cursor: 'pointer' }} onClick={() => navigate('/account')} />
        <img src={notificationIcon} alt="Notifications" style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
      </div>

      <div style={{ marginTop: '24px' }}>
        <button 
          style={{ 
            width: '100%', 
            padding: '12px 24px', 
            borderRadius: '25px', 
            backgroundColor: '#0466C8', 
            color: '#FFFFFF', 
            fontFamily: 'Open Sans', 
            fontSize: '16px', 
            fontWeight: 400, 
            lineHeight: '21.79px',
            textAlign: 'center',
            marginBottom: '16px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/create-request')}
        >
          + New Request
        </button>

        <button 
          style={{
            width: '100%', 
            padding: '12px 24px', 
            borderRadius: '12px', 
            backgroundColor: '#F3F5F9', 
            color: '#333333', 
            fontFamily: 'Open Sans', 
            fontSize: '16px', 
            fontWeight: 400, 
            lineHeight: '21.79px',
            textAlign: 'center',
            border: '1px solid #333333',
            marginBottom: '16px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/sort-and-filter')}
        >
          Sort/Filter
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <button 
            onClick={() => handleTabClick('open')}
            style={{
              width: '114.08px',
              height: '54px',
              backgroundColor: activeTab === 'open' ? '#FFFFFF' : '#A6A6A6',
              color: activeTab === 'open' ? '#007AFF' : '#333333',
              fontSize: '17px',
              fontWeight: 510,
              lineHeight: '20px',
              textAlign: 'center',
              borderRadius: '25px 0px 0px 25px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Open
          </button>
          <button 
            onClick={() => handleTabClick('closed')}
            style={{
              width: '114.08px',
              height: '54px',
              backgroundColor: activeTab === 'closed' ? '#FFFFFF' : '#A6A6A6',
            //   color: '#333333',
              color: activeTab === 'open' ? '#333333' : '#007AFF',
              fontSize: '17px',
              fontWeight: 700,
              lineHeight: '20px',
              textAlign: 'center',
              borderRadius: '0px 25px 25px 0px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Closed
          </button>
        </div>

        {/* Placeholder for the request cards based on the selected tab */}
        <div style={{ marginBottom: '32px' }}>
          {activeTab === 'open' ? (
            <>
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '25px 0px 0px 25px', marginBottom: '16px', border: '1px solid #CCCCCC', position: 'relative' }}>
                <div style={{ backgroundColor: '#DC3545BF', width: '24px', height: '100%', borderRadius: '0px 25px 25px 0px', position: 'absolute', top: 0, right: 0, opacity: 0.75 }}></div>
                <h4 style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '8px' }}>Toilet Leak - Started Yesterday</h4>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D', marginBottom: '8px' }}>Property A, Unit C</p>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#0466C8' }}>Called Contractor</p>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '25px 0px 0px 25px', marginBottom: '16px', border: '1px solid #CCCCCC', position: 'relative' }}>
                <div style={{ backgroundColor: '#FFC107BF', width: '24px', height: '100%', borderRadius: '0px 25px 25px 0px', position: 'absolute', top: 0, right: 0, opacity: 0.75 }}></div>
                <h4 style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '8px' }}>Leaky Faucet in Bathroom</h4>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D', marginBottom: '8px' }}>Property A, Unit A</p>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#0466C8' }}>Read Request</p>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '25px 0px 0px 25px', marginBottom: '16px', border: '1px solid #CCCCCC', position: 'relative' }}>
                <div style={{ backgroundColor: '#DC3545BF', width: '24px', height: '100%', borderRadius: '0px 25px 25px 0px', position: 'absolute', top: 0, right: 0, opacity: 0.75 }}></div>
                <h4 style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '8px' }}>Pest Control in Kitchen</h4>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D', marginBottom: '8px' }}>Property B, Unit C</p>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#0466C8' }}>Appointment Set</p>
              </div>
            </>
          ) : (
            <>
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '25px 0px 0px 25px', marginBottom: '16px', border: '1px solid #CCCCCC', position: 'relative' }}>
                <div style={{ backgroundColor: '#A6A6A6', width: '24px', height: '100%', borderRadius: '0px 25px 25px 0px', position: 'absolute', top: 0, right: 0, opacity: 0.75 }}></div>
                <h4 style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '8px' }}>Malfunctioning Thermostat</h4>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D', marginBottom: '8px' }}>Property A, Unit C</p>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#0466C8' }}>Request Complete</p>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '25px 0px 0px 25px', marginBottom: '16px', border: '1px solid #CCCCCC', position: 'relative' }}>
                <div style={{ backgroundColor: '#A6A6A6', width: '24px', height: '100%', borderRadius: '0px 25px 25px 0px', position: 'absolute', top: 0, right: 0, opacity: 0.75 }}></div>
                <h4 style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '8px' }}>Fix Bathroom Molding</h4>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D', marginBottom: '8px' }}>Property A, Unit C</p>
                <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#0466C8' }}>Request Complete</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCardList;

