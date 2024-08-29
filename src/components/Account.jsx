import React from 'react';
import { useNavigate } from 'react-router-dom';
import listIcon from '../assets/list-icon.png';
import notificationIcon from '../assets/notification-icon.png';
import editIcon from '../assets/edit-icon.png';

const Account = () => {
  const navigate = useNavigate();

  const units = [
    {
      id: 1,
      title: "Property A, Unit C",
      address: "1234 Alpha Way, Santa Barbara, CA 93105",
      tenantName: "John Smith",
      tenantEmail: "johnsmith@gmail.com",
      notes: "They have a dog (additional fee approved), bathroom floor is already damaged."
    },
    {
      id: 2,
      title: "Property B, Unit D",
      address: "5678 Beta Street, Santa Barbara, CA 93106",
      tenantName: "Jane Doe",
      tenantEmail: "janedoe@gmail.com",
      notes: "Tenant is requesting a new refrigerator."
    },
    {
      id: 3,
      title: "Property C, Unit E",
      address: "9101 Gamma Road, Santa Barbara, CA 93107",
      tenantName: "Alex Johnson",
      tenantEmail: "alexjohnson@gmail.com",
      notes: "Carpet cleaning scheduled for next week."
    },
    // Add more units as needed
  ];

  return (
    <div className="account-page" style={{ backgroundColor: '#F3F5F9', minHeight: '100vh' }}>
      {/* Blue Banner */}
      <div className="banner" style={{ backgroundColor: '#0466C8', padding: '24px 32px', display: 'flex', justifyContent: 'space-between' }}>
        <img src={listIcon} alt="Menu" onClick={() => navigate('/task-list')} style={{ cursor: 'pointer' }} />
        <img src={notificationIcon} alt="Notifications"  style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
      </div>

      {/* Welcome Text */}
      <h1 style={{ margin: '32px 32px 24px', fontSize: '40px', color: '#5C5D6D', lineHeight: '46.92px', fontWeight: '700' }}>
        Hi Samantha!
      </h1>

      {/* Unit Cards */}
      <div style={{ padding: '0 32px' }}>
        {units.map((unit, index) => (
          <div key={index} className="unit-card" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '32px', color: '#333333', fontWeight: '700', lineHeight: '37.54px' }}>Unit #{index + 1}</h2>
              <img src={editIcon} alt="Edit" onClick={() => navigate(`/edit-unit/${unit.id}`)} style={{ cursor: 'pointer' }} />
            </div>
            <div className="unit-details" style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333' }}>Unit Title</h3>
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.title}</p>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333' }}>Unit's Address</h3>
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.address}</p>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333' }}>Primary Tenant</h3>
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.tenantName}</p>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333' }}>Tenant's Email</h3>
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.tenantEmail}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333' }}>Notes</h3>
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Unit Button */}
      <div style={{ padding: '0 32px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/add-unit')} style={{ width: '100%', backgroundColor: '#0466C8', color: '#FFFFFF', padding: '12px 16px', borderRadius: '25px', fontSize: '16px', fontWeight: '600' }}>
          + Add Unit
        </button>
      </div>
    </div>
  );
};

export default Account;
