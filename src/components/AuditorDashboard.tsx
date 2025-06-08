import React from 'react';
import { FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaUserTie, FaClipboardCheck, FaSearch, FaExclamationCircle, FaSync, FaCog } from 'react-icons/fa';
import styles from '../styles/components/AuditorDashboard.module.css';

interface Notification {
  id: number;
  type: 'audit' | 'review' | 'alert' | 'update' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
}

interface AuditorDashboardProps {
  notifications?: Notification[];
}

const initialTasks = [
  {
    id: 'TASK-1001',
    date: '2024-06-01',
    description: 'Review system logs for compliance',
    status: 'Pending',
    assignedTo: 'John Doe',
  },
  {
    id: 'TASK-1002',
    date: '2024-06-02',
    description: 'Audit public report logs',
    status: 'Completed',
    assignedTo: 'Jane Smith',
  },
  {
    id: 'TASK-1003',
    date: '2024-06-03',
    description: 'Validate sampled cases',
    status: 'Pending',
    assignedTo: 'Mike Johnson',
  },
  {
    id: 'TASK-1004',
    date: '2024-06-04',
    description: 'Generate performance metrics',
    status: 'Completed',
    assignedTo: 'Sarah Williams',
  },
];

const AuditorDashboard: React.FC<AuditorDashboardProps> = ({ notifications = [] }) => {
  return (
    <div className={styles['ad-dashboard']}>
      <div className={styles['ad-card']}>
        <div className={styles['ad-header']}>Audit Tasks</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles['ad-table']}>
            <thead>
              <tr>
                <th className={styles['ad-th']}>Task ID</th>
                <th className={styles['ad-th']}>Date</th>
                <th className={styles['ad-th']}>Description</th>
                <th className={styles['ad-th']}>Status</th>
                <th className={styles['ad-th']}>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {initialTasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles['ad-td']} style={{ textAlign: 'center', color: '#aaa' }}>No tasks available</td>
                </tr>
              ) : (
                initialTasks.map(task => (
                  <tr key={task.id}>
                    <td className={styles['ad-td']} style={{ fontWeight: 600 }}>{task.id}</td>
                    <td className={styles['ad-td']}><FaCalendarAlt style={{ marginRight: 6, color: '#6366f1' }} />{task.date}</td>
                    <td className={styles['ad-td']}>{task.description}</td>
                    <td className={styles['ad-td']}>
                      {task.status === 'Completed' ? (
                        <span className={styles['ad-status'] + ' ' + styles['ad-status-completed']}><FaCheckCircle style={{ marginRight: 4 }} />Completed</span>
                      ) : (
                        <span className={styles['ad-status'] + ' ' + styles['ad-status-pending']}><FaExclamationTriangle style={{ marginRight: 4 }} />Pending</span>
                      )}
                    </td>
                    <td className={styles['ad-td']}>
                      <span className={styles['ad-assigned']}><FaUserTie style={{ marginRight: 4, color: '#0ea5e9' }} />{task.assignedTo}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles['ad-card']}>
        <div className={styles['ad-header']}>Notifications</div>
        {notifications.length === 0 ? (
          <div className={styles['ad-notification']}>
            <p>No new notifications at this time.</p>
          </div>
        ) : (
          <div className={styles['ad-notifications-list']}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles['ad-notification-item']} ${!notification.read ? styles['ad-unread'] : ''}`}
              >
                <div className={styles['ad-notification-icon']}>
                  {notification.type === 'audit' && <FaClipboardCheck />}
                  {notification.type === 'review' && <FaSearch />}
                  {notification.type === 'alert' && <FaExclamationCircle />}
                  {notification.type === 'update' && <FaSync />}
                  {notification.type === 'system' && <FaCog />}
                </div>
                <div className={styles['ad-notification-content']}>
                  <div className={styles['ad-notification-message']}>{notification.message}</div>
                  <div className={styles['ad-notification-time']}>
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </div>
                {!notification.read && <div className={styles['ad-unread-dot']} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditorDashboard; 