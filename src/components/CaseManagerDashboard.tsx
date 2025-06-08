import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle, FaUserTie } from 'react-icons/fa';
import styles from '../styles/components/CaseManagerDashboard.module.css';

const initialCases = [
  {
    id: 'CASE-1001',
    date: '2024-06-01',
    location: 'Sector 21, New Delhi',
    severity: 'High',
    status: 'Assigned',
    assignedTo: 'Amit Sharma',
  },
  {
    id: 'CASE-1002',
    date: '2024-06-02',
    location: 'MG Road, Gurugram',
    severity: 'Medium',
    status: 'Assigned',
    assignedTo: 'Priya Singh',
  },
  {
    id: 'CASE-1003',
    date: '2024-06-03',
    location: 'Ring Road, Delhi',
    severity: 'High',
    status: 'Assigned',
    assignedTo: 'Sunita Verma',
  },
  {
    id: 'CASE-1004',
    date: '2024-06-04',
    location: 'NH-8, Jaipur',
    severity: 'Low',
    status: 'Assigned',
    assignedTo: 'Rajesh Gupta',
  },
];

const CaseManagerDashboard: React.FC = () => {
  return (
    <div className={styles['cm-dashboard']}>
      <div className={styles['cm-card']}>
        <div className={styles['cm-header']}>Assigned Cases</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles['cm-table']}>
            <thead>
              <tr>
                <th className={styles['cm-th']}>Case ID</th>
                <th className={styles['cm-th']}>Date</th>
                <th className={styles['cm-th']}>Location</th>
                <th className={styles['cm-th']}>Severity</th>
                <th className={styles['cm-th']}>Status</th>
                <th className={styles['cm-th']}>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {initialCases.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles['cm-td']} style={{ textAlign: 'center', color: '#aaa' }}>No cases available</td>
                </tr>
              ) : (
                initialCases.map(caseItem => (
                  <tr key={caseItem.id}>
                    <td className={styles['cm-td']} style={{ fontWeight: 600 }}>{caseItem.id}</td>
                    <td className={styles['cm-td']}><FaCalendarAlt style={{ marginRight: 6, color: '#6366f1' }} />{caseItem.date}</td>
                    <td className={styles['cm-td']}><FaMapMarkerAlt style={{ marginRight: 6, color: '#fb923c' }} />{caseItem.location}</td>
                    <td className={styles['cm-td']}>
                      {caseItem.severity === 'High' ? (
                        <span className={styles['cm-severity'] + ' ' + styles['cm-severity-high']}><FaExclamationTriangle style={{ marginRight: 4 }} />High</span>
                      ) : caseItem.severity === 'Medium' ? (
                        <span className={styles['cm-severity'] + ' ' + styles['cm-severity-medium']}>Medium</span>
                      ) : (
                        <span className={styles['cm-severity'] + ' ' + styles['cm-severity-low']}>Low</span>
                      )}
                    </td>
                    <td className={styles['cm-td']}>
                      {caseItem.status === 'Assigned' ? (
                        <span className={styles['cm-status'] + ' ' + styles['cm-status-assigned']}><FaCheckCircle style={{ marginRight: 4 }} />Assigned</span>
                      ) : (
                        <span className={styles['cm-status'] + ' ' + styles['cm-status-unassigned']}>Unassigned</span>
                      )}
                    </td>
                    <td className={styles['cm-td']}>
                      <span className={styles['cm-assigned']}><FaUserTie style={{ marginRight: 4, color: '#0ea5e9' }} />{caseItem.assignedTo}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles['cm-card']}>
        <div className={styles['cm-header']}>Notifications</div>
        <div className={styles['cm-notification']}>
          <p>No new notifications at this time.</p>
        </div>
      </div>
    </div>
  );
};

export default CaseManagerDashboard; 