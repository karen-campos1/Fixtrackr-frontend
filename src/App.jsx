import React from 'react';
import { Route, Routes } from 'react-router-dom';
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


function App() {
  return (
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

    </Routes>
  );
}

export default App;
