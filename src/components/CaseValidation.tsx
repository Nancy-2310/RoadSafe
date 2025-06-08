import React from 'react';
import { FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaUserTie } from 'react-icons/fa';
import styles from '../styles/components/CaseValidation.module.css';

const initialCases = [
  {
    id: 'CASE-1001',
    date: '2024-06-01',
    description: 'Validate system logs for compliance',
    status: 'Pending',
    assignedTo: 'John Doe',
  },
  {
    id: 'CASE-1002',
    date: '2024-06-02',
    description: 'Audit public report logs',
    status: 'Completed',
    assignedTo: 'Jane Smith',
  },
  {
    id: 'CASE-1003',
    date: '2024-06-03',
    description: 'Validate sampled cases',
    status: 'Pending',
    assignedTo: 'Mike Johnson',
  },
  {
    id: 'CASE-1004',
    date: '2024-06-04',
    description: 'Generate performance metrics',
    status: 'Completed',
    assignedTo: 'Sarah Williams',
  },
];

const CaseValidation: React.FC = () => {
  return (
    <div className={styles['cv-dashboard']}>
      <div className={styles['cv-card']}>
        <div className={styles['cv-header']}>Case Validation</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles['cv-table']}>
            <thead>
              <tr>
                <th className={styles['cv-th']}>Case ID</th>
                <th className={styles['cv-th']}>Date</th>
                <th className={styles['cv-th']}>Description</th>
                <th className={styles['cv-th']}>Status</th>
                <th className={styles['cv-th']}>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {initialCases.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles['cv-td']} style={{ textAlign: 'center', color: '#aaa' }}>No cases available</td>
                </tr>
              ) : (
                initialCases.map(caseItem => (
                  <tr key={caseItem.id}>
                    <td className={styles['cv-td']} style={{ fontWeight: 600 }}>{caseItem.id}</td>
                    <td className={styles['cv-td']}><FaCalendarAlt style={{ marginRight: 6, color: '#6366f1' }} />{caseItem.date}</td>
                    <td className={styles['cv-td']}>{caseItem.description}</td>
                    <td className={styles['cv-td']}>
                      {caseItem.status === 'Completed' ? (
                        <span className={styles['cv-status'] + ' ' + styles['cv-status-completed']}><FaCheckCircle style={{ marginRight: 4 }} />Completed</span>
                      ) : (
                        <span className={styles['cv-status'] + ' ' + styles['cv-status-pending']}><FaExclamationTriangle style={{ marginRight: 4 }} />Pending</span>
                      )}
                    </td>
                    <td className={styles['cv-td']}>
                      <span className={styles['cv-assigned']}><FaUserTie style={{ marginRight: 4, color: '#0ea5e9' }} />{caseItem.assignedTo}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles['cv-card']}>
        <div className={styles['cv-header']}>Notifications</div>
        <div className={styles['cv-notification']}>
          <p>No new notifications at this time.</p>
        </div>
      </div>
    </div>
  );
};

export default CaseValidation; 