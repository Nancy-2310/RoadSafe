import React, { useState } from 'react';
import { FaHome, FaFileAlt, FaCheckCircle, FaChartBar, FaBell, FaComments, FaSignOutAlt, FaBars, FaUserCircle } from 'react-icons/fa';
import AuditorDashboard from '../components/AuditorDashboard';
import LogReview from '../components/LogReview';
import CaseValidation from '../components/CaseValidation';
import PerformanceReports from '../components/PerformanceReports';
import ComplianceAlerts from '../components/ComplianceAlerts';
import Messages from '../components/Messages';
import styles from '../styles/pages/Auditor.module.css';

const Auditor: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const components = [
    { key: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { key: 'log_review', label: 'Log Review', icon: <FaFileAlt /> },
    { key: 'case_validation', label: 'Case Validation', icon: <FaCheckCircle /> },
    { key: 'performance_reports', label: 'Performance Reports', icon: <FaChartBar /> },
    { key: 'compliance_alerts', label: 'Compliance Alerts', icon: <FaBell /> },
    { key: 'messages', label: 'Messages', icon: <FaComments /> }
  ];

  const componentTitles: Record<string, string> = {
    dashboard: 'Auditor Dashboard',
    log_review: 'Log Review',
    case_validation: 'Case Validation',
    performance_reports: 'Performance Reports',
    compliance_alerts: 'Compliance Alerts',
    messages: 'Messages'
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <AuditorDashboard />;
      case 'log_review':
        return <LogReview />;
      case 'case_validation':
        return <CaseValidation />;
      case 'performance_reports':
        return <PerformanceReports />;
      case 'compliance_alerts':
        return <ComplianceAlerts />;
      case 'messages':
        return <Messages />;
      default:
        return <AuditorDashboard />;
    }
  };

  return (
    <div className={styles['auditor-container']}>
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
                <span className={styles['user-name']}>Auditor</span>
                <span className={styles['user-role']}>Auditor</span>
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

export default Auditor; 