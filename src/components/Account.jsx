import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import listIcon from '../assets/list-icon.png';
import notificationIcon from '../assets/notification-icon.png';
import editIcon from '../assets/edit-icon.png';

const Account = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [firstName, setFirstName] = useState(''); // State to store the property manager's first name

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          throw new Error('No token found, please log in.');
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await axios.get('http://localhost:8000/api/units/', config);
        
        setFirstName(response.data.property_manager_first_name); // Set the first name
        setUnits(response.data.units); // Set the units state with the fetched data
        setLoading(false); // Data fetching is complete
      } catch (err) {
        console.error('Error fetching units:', err);
        setError('Failed to load units. Please try again later.');
        setLoading(false); // Even if there is an error, stop loading
      }
    };
    
    fetchUnits();
  }, []); // Empty dependency array means this runs once on component mount
  
  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  if (error) {
    return <div>{error}</div>; // Display any error messages
  }

  return (
    <div className="account-page" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F3F5F9', minHeight: '100vh' }}>
      {/* Blue Banner */}
      <div className="banner" style={{ backgroundColor: '#0466C8', padding: '24px 32px', display: 'flex', justifyContent: 'space-between' }}>
        <img src={listIcon} alt="Menu" onClick={() => navigate('/task-list')} style={{ cursor: 'pointer' }} />
        <img src={notificationIcon} alt="Notifications"  style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
      </div>

      {/* Welcome Text */}
      <h1 style={{ margin: '32px 32px 24px', fontSize: '40px', color: '#5C5D6D', lineHeight: '46.92px', fontWeight: '700' }}>
        Hi {firstName}!
      </h1>

      {/* Unit Cards */}
      <div style={{ padding: '0 32px' }}>
        {units.map((unit, index) => (
          <div key={unit.id} className="unit-card" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
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
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.tenant_full_name}</p> {/* Update to tenant_full_name */}
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333' }}>Tenant's Email</h3>
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.tenant_email}</p> {/* Update to tenant_email */}
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
