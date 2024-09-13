import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import listIcon from '../assets/list-icon.png'; 
import notificationIcon from '../assets/notification-icon.png';
import { axiosInstance } from '../auth/privateAxios';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get(`/notifications/`);
        setNotifications(response.data);  // Assuming backend sends an array of notifications
        setLoading(false);
      } catch (err) {
        console.log("Error = ",err)
        setError('Failed to load notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification_id,request_id) => {
    try {
      // Mark the notification as read in the backend
      await axiosInstance.put(`http://localhost:8000/api/notifications/read/${notification_id}/`);
      // Remove the notification from the list after it's opened
      setNotifications((prevNotifications) => prevNotifications.filter(n => n.id !== notification_id));
      // Navigate to the open request page
      navigate(`/open-request/${request_id}`);
    } catch (err) {
      console.log("Error = ",err)
      setError('Failed to open notification');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ backgroundColor: '#F3F5F9', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0466C8', padding: '24px 32px' }}>
        <img src={listIcon} alt="List" style={{ cursor: 'pointer' }} onClick={() => navigate('/task-list')} />
        <img src={notificationIcon} alt="Notifications" style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
      </div>
      <h2 style={{ fontFamily: 'Work Sans', fontSize: '24px', fontWeight: 600, lineHeight: '28.15px', color: '#5C5D6D', marginTop: '32px', paddingLeft: '32px', paddingRight: '32px'}}>
        {`${notifications.length} Unread Notifications`}
      </h2>
      <div style={{ marginTop: '32px', marginLeft: '32px', paddingRight: '32px'}}>
        {notifications.map((notification) => (
          <div key={notification.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: '25px', padding: '24px', marginBottom: '16px', cursor: 'pointer' }}
               onClick={() => handleNotificationClick(notification.id,notification.maintenance_request)}>
            <p style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '0px' }}>
              {notification.issue}
            </p>
            <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D' }}>
              {notification.unit_title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;










































// HARD CODED - FOR DEMO

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import listIcon from '../assets/list-icon.png'; 
// import notificationIcon from '../assets/notification-icon.png';

// const Notifications = () => {
//   const navigate = useNavigate();

//   // Hardcoded example data
//   const notifications = [
//     { id: 1, issue: "Leak in the ceiling", property: "123 Main St, unit 100" },
//     { id: 2, issue: "Exterior Light Fixture Replacement", property: "555 Dallas St, Lemon House" },
//     { id: 3, issue: "Dishwasher Leaking During Cycle", property: "321 Yellow St, Chainey Duplex #A" }
//   ];

//   const handleNotificationClick = (id) => {
//     navigate(`/open-request/${id}`);
//   };

//   return (
//     <div style={{ backgroundColor: '#F3F5F9', height: '100vh' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0466C8', padding: '24px 32px' }}>
//         <img src={listIcon} alt="List" style={{ cursor: 'pointer' }} onClick={() => navigate('/task-list')} />
//         <img src={notificationIcon} alt="Notifications" style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
//       </div>
//       <h2 style={{ fontFamily: 'Work Sans', fontSize: '24px', fontWeight: 600, lineHeight: '28.15px', color: '#5C5D6D', marginTop: '32px', paddingLeft: '32px', paddingRight: '32px'}}>
//         {`${notifications.length} Unread Notifications`}
//       </h2>
//       <div style={{ marginTop: '32px', marginLeft: '32px', paddingRight: '32px'}}>
//         {notifications.map((notification) => (
//           <div key={notification.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: '25px', padding: '24px', marginBottom: '16px', cursor: 'pointer' }}
//                onClick={() => handleNotificationClick(notification.id)}>
//             <p style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '0px' }}>
//               {notification.issue}
//             </p>
//             <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D' }}>
//               {notification.property}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notifications;