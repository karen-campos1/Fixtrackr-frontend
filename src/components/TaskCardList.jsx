import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import accountIcon from '../assets/account-icon.png';
import notificationIcon from '../assets/notification-icon.png';

const TaskCardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('open'); // default to "Open" tab

  // Sample hardcoded data for tasks
  const tasks = [
    {
      id: 1,
      title: "Leak in the ceiling",
      unit: "123 Main St, unit 100",
      status: "Called Contractor",
      priority: "high",
      updatedAt: "2023-08-29",
      color: "#DC3545BF", // High priority (red)
      isClosed: false,
    },
    {
      id: 2,
      title: "Leaky Faucet in Bathroom",
      unit: "555 Dallas St, Lemon House",
      status: "Read Request",
      priority: "low",
      updatedAt: "2023-08-25",
      color: "#FFC107BF", // Low priority (yellow)
      isClosed: false,
    },
    {
      id: 3,
      title: "Pest Control in Kitchen",
      unit: "321 Yellow St, Chainey Duplex #A",
      status: "Appointment Set",
      priority: "high",
      updatedAt: "2023-08-20",
      color: "#DC3545BF", // High priority (red)
      isClosed: false,
    },
    {
      id: 4,
      title: "Malfunctioning Thermostat",
      unit: "111 Erick Ave, Unit 11",
      status: "Request Complete",
      priority: "low",
      updatedAt: "2023-08-15",
      color: "#A6A6A6", // Closed task
      isClosed: true,
    },
    {
      id: 5,
      title: "Fix Bathroom Molding",
      unit: "Property A, Unit C",
      status: "Request Complete",
      priority: "low",
      updatedAt: "2023-08-10",
      color: "#A6A6A6", // Closed task
      isClosed: true,
    },
  ];

  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    let filtered = tasks.filter(task => !task.isClosed); // Default to open tasks

    if (activeTab === 'closed') {
      filtered = tasks.filter(task => task.isClosed); // Show closed tasks when 'closed' tab is active
    } else if (activeTab === 'open') {
      filtered = tasks.filter(task => !task.isClosed); // Show open tasks when 'open' tab is active
    }

    // Apply sort and filter based on the passed state (location.state)
    if (location.state) {
      const { sortBy, priority, units } = location.state;

      // Filter by priority
      if (priority?.high || priority?.low) {
        filtered = filtered.filter(task => {
          return (priority.high && task.priority === 'high') ||
                 (priority.low && task.priority === 'low');
        });
      }

      // Filter by units
      if (units?.unitA || units?.unitB || units?.unitC) {
        filtered = filtered.filter(task => {
          return (units.unitA && task.unit === "123 Main St, unit 100") ||
                 (units.unitB && task.unit === "555 Dallas St, Lemon House") ||
                 (units.unitC && task.unit === "321 Yellow St, Chainey Duplex #A");
        });
      }

      // Sort tasks based on sorting criteria
      if (sortBy === 'most_recently_updated') {
        filtered = filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      } else if (sortBy === 'least_recently_updated') {
        filtered = filtered.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      } else if (sortBy === 'highest_priority') {
        filtered = filtered.sort((a, b) => a.priority === 'high' ? -1 : 1);
      }
    }

    setFilteredTasks(filtered);
  }, [activeTab, location.state]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F3F5F9', minHeight: '100vh', padding: '24px 32px' }}>
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
              color: activeTab === 'closed' ? '#007AFF' : '#333333',
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

        {/* Display request cards based on the selected tab */}
        <div style={{ marginBottom: '32px' }}>
          {filteredTasks.map(task => (
            <div key={task.id} style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '25px 0px 0px 25px', marginBottom: '16px', border: '1px solid #CCCCCC', position: 'relative' }}>
              <div style={{ backgroundColor: task.color, width: '24px', height: '100%', borderRadius: '0px 25px 25px 0px', position: 'absolute', top: 0, right: 0, opacity: 0.75 }}></div>
              <h4 style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '8px' }}>{task.title}</h4>
              <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D', marginBottom: '8px' }}>{task.unit}</p>
              <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#0466C8' }}>{task.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCardList;
