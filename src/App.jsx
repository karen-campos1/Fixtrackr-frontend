import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LoginPage from './components/LoginPage';
import SignUpPersonalInfo from './components/SignUpPersonalInfo';
import SignUpUnitInfo from './components/SignUpUnitInfo';
import Account from './components/Account';
import EditUnit from './components/EditUnitCard';
import AddUnit from './components/AddUnit';
import Notifications from './components/Notifications';
import OpenNotification from './components/OpenNotification';
import TaskList from './components/TaskCardList';
import SortFilter from './components/SortFilter';
import CreateRequest from './components/CreateRequest';
import Loading from './components/LoadingScreen'; 
import loadingImage from './assets/LoadingScreen.png';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate a loading state for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Loading ends after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loading loadingImage={loadingImage} />}
      {!loading && (
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPersonalInfo />} />
          <Route path="/signup-units" element={<SignUpUnitInfo />} />
          <Route path="/account" element={<Account />} />
          <Route path="/edit-unit/:id" element={<EditUnit />} />
          <Route path="/add-unit" element={<AddUnit />} /> 
          <Route path="/notifications" element={<Notifications />} /> 
          <Route path="/open-request/:id" element={<OpenNotification />} />
          <Route path="/task-list" element={<TaskList />} /> 
          <Route path="/sort-and-filter" element={<SortFilter />} />  
          <Route path="/create-request" element={<CreateRequest />} />  
        </Routes>
      )}
    </>
  );
}

export default App;
