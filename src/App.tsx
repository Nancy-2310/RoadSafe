import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Administrator from './pages/Administrator';
import FieldOfficer from './pages/FieldOfficer';
import CaseManager from './pages/CaseManager';
import Auditor from './pages/Auditor';
import Reviewer from './pages/Reviewer';
import './App.css';

const App: React.FC = () => {
  const path = window.location.pathname;

  return (
    <div className="app">
      {path === '/' && <Home />}
      {path === '/login' && <Login />}
      {path === '/administrator' && <Administrator />}
      {path === '/field-officer' && <FieldOfficer />}
      {path === '/case-manager' && <CaseManager />}
      {path === '/auditor' && <Auditor />}
      {path === '/reviewer' && <Reviewer />}
    </div>
  );
};

export default App; 