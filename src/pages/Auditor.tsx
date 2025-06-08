import React, { useState } from 'react';
import { FaHome, FaFileAlt, FaCheckCircle, FaChartBar, FaBell, FaComments, FaSignOutAlt, FaBars, FaUserCircle, FaClipboardCheck, FaSearch, FaExclamationCircle, FaSync, FaCog } from 'react-icons/fa';
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
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'audit',
      message: 'New audit report available for Case #AUD-2024-001',
      timestamp: '2024-03-20T10:30:00',
      read: false
    },
    {
      id: 2,
      type: 'review',
      message: 'Case #CM-2024-015 requires audit review',
      timestamp: '2024-03-20T09:15:00',
      read: false
    },
    {
      id: 3,
      type: 'alert',
      message: 'Audit deadline approaching for Case #AUD-2024-002',
      timestamp: '2024-03-19T16:45:00',
      read: false
    },
    {
      id: 4,
      type: 'update',
      message: 'Audit findings updated for Case #AUD-2024-003',
      timestamp: '2024-03-19T14:20:00',
      read: true
    },
    {
      id: 5,
      type: 'system',
      message: 'New audit guidelines have been published',
      timestamp: '2024-03-19T11:00:00',
      read: true
    }
  ]);

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

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <AuditorDashboard notifications={notifications} />;
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
        return <AuditorDashboard notifications={notifications} />;
    }
  };

  const renderNotifications = () => {
    if (notifications.length === 0) {
      return (
        <div className={styles.noNotifications}>
          No new notifications at this time.
        </div>
      );
    }

    return (
      <div className={styles.notificationsList}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className={styles.notificationIcon}>
              {notification.type === 'audit' && <FaClipboardCheck />}
              {notification.type === 'review' && <FaSearch />}
              {notification.type === 'alert' && <FaExclamationCircle />}
              {notification.type === 'update' && <FaSync />}
              {notification.type === 'system' && <FaCog />}
            </div>
            <div className={styles.notificationContent}>
              <div className={styles.notificationMessage}>{notification.message}</div>
              <div className={styles.notificationTime}>
                {new Date(notification.timestamp).toLocaleString()}
              </div>
            </div>
            {!notification.read && <div className={styles.unreadDot} />}
          </div>
        ))}
      </div>
    );
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