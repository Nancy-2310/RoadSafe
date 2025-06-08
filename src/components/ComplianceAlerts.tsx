import React from 'react';
import { FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaBell } from 'react-icons/fa';
import styles from '../styles/components/ComplianceAlerts.module.css';

const initialAlerts = [
  {
    id: 'ALERT-1001',
    date: '2024-06-01',
    description: 'System compliance alert',
    severity: 'High',
    status: 'Active',
  },
  {
    id: 'ALERT-1002',
    date: '2024-06-02',
    description: 'Public report compliance alert',
    severity: 'Medium',
    status: 'Resolved',
  },
  {
    id: 'ALERT-1003',
    date: '2024-06-03',
    description: 'Case validation compliance alert',
    severity: 'Low',
    status: 'Active',
  },
  {
    id: 'ALERT-1004',
    date: '2024-06-04',
    description: 'Performance metrics compliance alert',
    severity: 'High',
    status: 'Resolved',
  },
];

const ComplianceAlerts: React.FC = () => {
  return (
    <div className={styles['ca-dashboard']}>
      <div className={styles['ca-card']}>
        <div className={styles['ca-header']}>Compliance Alerts</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles['ca-table']}>
            <thead>
              <tr>
                <th className={styles['ca-th']}>Alert ID</th>
                <th className={styles['ca-th']}>Date</th>
                <th className={styles['ca-th']}>Description</th>
                <th className={styles['ca-th']}>Severity</th>
                <th className={styles['ca-th']}>Status</th>
              </tr>
            </thead>
            <tbody>
              {initialAlerts.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles['ca-td']} style={{ textAlign: 'center', color: '#aaa' }}>No alerts available</td>
                </tr>
              ) : (
                initialAlerts.map(alert => (
                  <tr key={alert.id}>
                    <td className={styles['ca-td']} style={{ fontWeight: 600 }}>{alert.id}</td>
                    <td className={styles['ca-td']}><FaCalendarAlt style={{ marginRight: 6, color: '#6366f1' }} />{alert.date}</td>
                    <td className={styles['ca-td']}>{alert.description}</td>
                    <td className={styles['ca-td']}>
                      {alert.severity === 'High' ? (
                        <span className={styles['ca-severity'] + ' ' + styles['ca-severity-high']}><FaExclamationTriangle style={{ marginRight: 4 }} />High</span>
                      ) : alert.severity === 'Medium' ? (
                        <span className={styles['ca-severity'] + ' ' + styles['ca-severity-medium']}>Medium</span>
                      ) : (
                        <span className={styles['ca-severity'] + ' ' + styles['ca-severity-low']}>Low</span>
                      )}
                    </td>
                    <td className={styles['ca-td']}>
                      {alert.status === 'Resolved' ? (
                        <span className={styles['ca-status'] + ' ' + styles['ca-status-resolved']}><FaCheckCircle style={{ marginRight: 4 }} />Resolved</span>
                      ) : (
                        <span className={styles['ca-status'] + ' ' + styles['ca-status-active']}><FaBell style={{ marginRight: 4 }} />Active</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles['ca-card']}>
        <div className={styles['ca-header']}>Notifications</div>
        <div className={styles['ca-notification']}>
          <p>No new notifications at this time.</p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceAlerts; 