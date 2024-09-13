import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import accountIcon from '../assets/account-icon.png';
import notificationIcon from '../assets/notification-icon.png';
import { axiosInstance } from '../auth/privateAxios';
import SortFilter from './SortFilter';

const TaskCardList = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [activeTab, setActiveTab] = useState('open'); // default to "Open" tab
  const [tasks,setTasks] = useState(null)
  const [units,setUnits] = useState(null)
  const [showSort,setShowSort] = useState(false)
  const [sortParams,setSortParams] = useState({priority:"",unit:null,sort_field:"most_recently_updated"})
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")
  const fetching = useRef(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/maintenance-requests/`)
        setUnits(response.data.units)
        setTasks(response.data.requests)
        setLoading(false)
      } catch (err) {
        console.log("Error - ",err)
        // console.error('Error fetching units:', err);
        setError('Failed to load requests. Please try again later.');
        setLoading(false); // Even if there is an error, stop loading
      }
    };

    if (fetching.current){
      fetching.current = false
      fetchRequests();
    }
  }, []);

  const filteredTasks = useMemo(()=>{
    let results = []
    if (tasks){
      results = [...tasks]
      if (activeTab === 'closed') {
        results = results.filter(task => task.isClosed); // Show closed tasks when 'closed' tab is active
      }
      else if (activeTab === 'open') {
        results = results.filter(task => !task.isClosed); // Show open tasks when 'open' tab is active
      }
      if (sortParams.priority){
        results = results.filter(task => {
          return (sortParams.priority === "high" && task.priority === 'high') ||
            (sortParams.priority === "low" && task.priority === 'low');
          });
      }
      if (sortParams.unit){
        results = results.filter(task => task.unit.id.toString() === sortParams.unit);
      }

      if (sortParams.field === 'most_recently_updated'){
        results = results.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      }
      else if (sortParams.field === 'least_recently_updated'){
        results = results.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
      }
      else if (sortParams.field === 'highest_priority') {
        results = results.sort((a) => a.priority === 'high' ? -1 : 1);
      }
    }
    return results
  },[tasks,sortParams,activeTab])

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const displayRequest = (task_id) => {
    navigate(`/open-request/${task_id}`)
  }

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  if (error) {
    return <div>{error}</div>; // Display any error messages
  }

  return ( 
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F3F5F9', minHeight: '100vh', padding: '24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0466C8', padding: '24px 32px', margin: '-24px -32px 0', height: '96px' }}>
        <img src={accountIcon} alt="Account" style={{ cursor: 'pointer' }} onClick={() => navigate('/account')} />
        <img src={notificationIcon} alt="Notifications" style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
      </div>
      {showSort ? 
      <SortFilter
        units = {units}
        sortParams = {sortParams}
        setSortParams = {setSortParams}
        closeMenu = {()=>setShowSort(false)}
      /> :
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
          onClick={() => setShowSort(true)}
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
            <div key={task.id} style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '25px 0px 0px 25px', marginBottom: '16px', border: '1px solid #CCCCCC', position: 'relative' }} onClick = {()=>displayRequest(task.id)}>
              <div style={{ backgroundColor: task.priority === "high" ? "#DC3545BF" : "#FFC107BF", width: '24px', height: '100%', borderRadius: '0px 25px 25px 0px', position: 'absolute', top: 0, right: 0, opacity: 0.75 }}></div>
              <h4 style={{ fontFamily: 'Open Sans', fontSize: '18px', fontWeight: 600, color: '#333333', marginBottom: '8px' }}>{task.subject}</h4>
              <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#5C5D6D', marginBottom: '8px' }}>{task.unit.address}</p>
              <p style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#0466C8' }}>{task.status}</p>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

export default TaskCardList;
