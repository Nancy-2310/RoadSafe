import React, { useState } from 'react';
import { FaHome, FaFileAlt, FaComments, FaSignOutAlt, FaBars, FaUserCircle } from 'react-icons/fa';
import CaseManagerDashboard from '../components/CaseManagerDashboard';
import CaseDetails from '../components/CaseDetails';
import Messages from '../components/Messages';
import styles from '../styles/pages/CaseManager.module.css';

const CaseManager: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const components = [
    { key: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { key: 'case_details', label: 'Case Details', icon: <FaFileAlt /> },
    { key: 'messages', label: 'Messages', icon: <FaComments /> }
  ];

  const componentTitles: Record<string, string> = {
    dashboard: 'Case Manager Dashboard',
    case_details: 'Case Details',
    messages: 'Messages'
  };

  const handleLogout = () => {
    // Placeholder: implement actual logout logic as needed
    window.location.reload();
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <CaseManagerDashboard />;
      case 'case_details':
        return <CaseDetails />;
      case 'messages':
        return <Messages />;
      default:
        return <CaseManagerDashboard />;
    }
  };

  return (
    <div className={styles['case-manager-container']}>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles['sidebar-header']}>
          <div className={styles['logo-text']}>Road Safe</div>
          <button className={styles['toggle-sidebar']} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars />
          </button>
        </div>
        <nav className={styles['sidebar-nav']}>
          {components.map((comp) => (
            <React.Fragment key={comp.key}>
              <button
                className={`${styles['nav-item']} ${activePage === comp.key ? styles.active : ''}`}
                onClick={() => setActivePage(comp.key)}
              >
                {comp.icon}
                <span>{comp.label}</span>
              </button>
              {comp.key === 'messages' && (
                <button className={`${styles['nav-item']} ${styles.logout}`} onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <main className={styles['main-content']}>
        <header className={styles['content-header']}>
          <h1>{componentTitles[activePage]}</h1>
          <div className={styles['user-info']}>
            <div className={styles['user-profile']}>
              <FaUserCircle className={styles['user-avatar']} />
              <div className={styles['user-details']}>
                <span className={styles['user-name']}>Case Manager</span>
                <span className={styles['user-role']}>Case Manager</span>
              </div>
            </div>
          </div>
        </header>
        <div className={styles['content-area']}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default CaseManager; 