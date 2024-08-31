import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import listIcon from '../assets/list-icon.png';
import notificationIcon from '../assets/notification-icon.png';
import editIcon from '../assets/edit-icon.png';

const Account = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loading state while data is being fetched
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          throw new Error('No token found, please log in.');
        }
  
        // Set up the headers with the token for authentication
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        // Make the API call to fetch units
        const response = await axios.get('http://localhost:8000/api/units/', config);
        setUnits(response.data); // Set the units state with the fetched data
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
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.primary_tenant_name}</p>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333' }}>Tenant's Email</h3>
                <p style={{ fontSize: '16px', color: '#5C5D6D' }}>{unit.primary_tenant_email}</p>
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
