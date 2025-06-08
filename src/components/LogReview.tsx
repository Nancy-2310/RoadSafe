import React from 'react';
import { FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaFileAlt } from 'react-icons/fa';
import styles from '../styles/components/LogReview.module.css';

const initialLogs = [
  {
    id: 'LOG-1001',
    date: '2024-06-01',
    type: 'System',
    description: 'System log for compliance review',
    status: 'Pending',
  },
  {
    id: 'LOG-1002',
    date: '2024-06-02',
    type: 'Public',
    description: 'Public report log for audit',
    status: 'Completed',
  },
  {
    id: 'LOG-1003',
    date: '2024-06-03',
    type: 'System',
    description: 'System log for validation',
    status: 'Pending',
  },
  {
    id: 'LOG-1004',
    date: '2024-06-04',
    type: 'Public',
    description: 'Public report log for review',
    status: 'Completed',
  },
];

const LogReview: React.FC = () => {
  return (
    <div className={styles['lr-dashboard']}>
      <div className={styles['lr-card']}>
        <div className={styles['lr-header']}>Log Review</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles['lr-table']}>
            <thead>
              <tr>
                <th className={styles['lr-th']}>Log ID</th>
                <th className={styles['lr-th']}>Date</th>
                <th className={styles['lr-th']}>Type</th>
                <th className={styles['lr-th']}>Description</th>
                <th className={styles['lr-th']}>Status</th>
              </tr>
            </thead>
            <tbody>
              {initialLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles['lr-td']} style={{ textAlign: 'center', color: '#aaa' }}>No logs available</td>
                </tr>
              ) : (
                initialLogs.map(log => (
                  <tr key={log.id}>
                    <td className={styles['lr-td']} style={{ fontWeight: 600 }}>{log.id}</td>
                    <td className={styles['lr-td']}><FaCalendarAlt style={{ marginRight: 6, color: '#6366f1' }} />{log.date}</td>
                    <td className={styles['lr-td']}><FaFileAlt style={{ marginRight: 6, color: '#fb923c' }} />{log.type}</td>
                    <td className={styles['lr-td']}>{log.description}</td>
                    <td className={styles['lr-td']}>
                      {log.status === 'Completed' ? (
                        <span className={styles['lr-status'] + ' ' + styles['lr-status-completed']}><FaCheckCircle style={{ marginRight: 4 }} />Completed</span>
                      ) : (
                        <span className={styles['lr-status'] + ' ' + styles['lr-status-pending']}><FaExclamationTriangle style={{ marginRight: 4 }} />Pending</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles['lr-card']}>
        <div className={styles['lr-header']}>Notifications</div>
        <div className={styles['lr-notification']}>
          <p>No new notifications at this time.</p>
        </div>
      </div>
    </div>
  );
};

export default LogReview;
