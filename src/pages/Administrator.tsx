import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaTasks, FaCheckCircle, FaCogs, FaChartBar, FaEnvelope, FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import AdministratorDashboard from '../components/AdministratorDashboard';
import UserManagement from '../components/UserManagement';
import PublicReportAssignment from '../components/PublicReportAssignment';
import CaseAssignment from '../components/CaseAssignment';
import QualityControl from '../components/QualityControl';
import SystemConfiguration from '../components/SystemConfiguration';
import Reports from '../components/Reports';
import Messages from '../components/Messages';
import '../styles/components/CaseAssignment.module.css';
import '../styles/components/QualityControl.module.css';
import '../styles/components/SystemConfiguration.module.css';
import '../styles/components/Reports.module.css';


const components = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { key: 'user_management', label: 'User Management', icon: <FaUsers /> },
  { key: 'public_report_assignment', label: 'Public Report Assignment', icon: <FaClipboardList /> },
  { key: 'case_assignment', label: 'Case Assignment', icon: <FaTasks /> },
  { key: 'quality_control', label: 'Quality Control', icon: <FaCheckCircle /> },
  { key: 'system_config', label: 'System Configuration', icon: <FaCogs /> },
  { key: 'reports', label: 'Reports', icon: <FaChartBar /> },
  { key: 'messages', label: 'Messages', icon: <FaEnvelope /> },
];

const componentTitles: Record<string, string> = {
  dashboard: 'Administrator Dashboard',
  user_management: 'User Management',
  public_report_assignment: 'Public Report Assignment',
  case_assignment: 'Case Assignment',
  quality_control: 'Quality Control',
  system_config: 'System Configuration',
  reports: 'Reports',
  messages: 'Messages',
};

const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500 text-xl font-semibold min-h-[300px] flex flex-col items-center justify-center">
    <span>{title} (Coming Soon)</span>
  </div>
);

const Administrator: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdministratorDashboard />;
      case 'user_management':
        return <UserManagement />;
      case 'public_report_assignment':
        return <PublicReportAssignment />;
      case 'case_assignment':
        return <CaseAssignment />;
      case 'quality_control':
        return <QualityControl />;
      case 'system_config':
        return <SystemConfiguration />;
      case 'reports':
        return <Reports />;
      case 'messages':
        return <Messages />;
      default:
        return <AdministratorDashboard />;
    }
  };

  const handleLogout = () => {
    // Placeholder: implement actual logout logic as needed
    window.location.reload();
  };

  return (
    <div className="field-officer-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-text font-bold text-2xl text-orange-500">Road Safe</div>
          <button 
            className="toggle-sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>
        <nav className="sidebar-nav">
          {components.map((comp) => (
            <React.Fragment key={comp.key}>
              <button
                className={`nav-item ${activePage === comp.key ? 'active' : ''}`}
                onClick={() => setActivePage(comp.key)}
              >
                {comp.icon}
                <span>{comp.label}</span>
              </button>
              {comp.key === 'messages' && (
                <button className="nav-item logout" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <main className="main-content">
        <header className="content-header">
          <h1>{componentTitles[activePage]}</h1>
          <div className="user-info">
            <div className="user-profile">
              <FaUserCircle className="user-avatar" />
              <div className="user-details">
                <span className="user-name">Admin User</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Administrator; 