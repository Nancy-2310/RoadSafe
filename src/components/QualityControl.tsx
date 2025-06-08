import React, { useState } from 'react';
import { FaCheckCircle, FaUserTie, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import styles from '../styles/components/QualityControl.module.css';

const initialClosedCases = [
  { id: 'CASE-2001', date: '2024-05-21', location: 'Sector 12, Noida', closedBy: 'Amit Sharma', reviewed: false },
  { id: 'CASE-2002', date: '2024-05-22', location: 'DLF Phase 3, Gurugram', closedBy: 'Priya Singh', reviewed: false },
  { id: 'CASE-2003', date: '2024-05-23', location: 'Saket, Delhi', closedBy: 'Sunita Verma', reviewed: true },
  { id: 'CASE-2004', date: '2024-05-24', location: 'NH-24, Ghaziabad', closedBy: 'Rajesh Gupta', reviewed: false },
];

const QualityControl: React.FC = () => {
  const [cases, setCases] = useState(initialClosedCases);

  const handleReview = (id: string) => {
    setCases(cases.map(c => c.id === id ? { ...c, reviewed: true } : c));
  };

  return (
    <div className={styles['qc-container']}>
      <div className={styles['qc-card']}>
        <div className={styles['qc-header']}>Quality Control: Closed Case Reviews</div>
        <div style={{overflowX: 'auto'}}>
          <table className={styles['qc-table']}>
            <thead>
              <tr>
                <th className={styles['qc-th']}>Case ID</th>
                <th className={styles['qc-th']}>Date</th>
                <th className={styles['qc-th']}>Location</th>
                <th className={styles['qc-th']}>Closed By</th>
                <th className={styles['qc-th']}>Review Status</th>
                <th className={styles['qc-th']} style={{textAlign: 'center'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles['qc-td']} style={{textAlign: 'center', color: '#aaa'}}>No closed cases</td>
                </tr>
              ) : (
                cases.map(caseItem => (
                  <tr key={caseItem.id}>
                    <td className={styles['qc-td']} style={{fontWeight: 600}}>{caseItem.id}</td>
                    <td className={styles['qc-td']}><FaCalendarAlt style={{marginRight: 6, color: '#6366f1'}} />{caseItem.date}</td>
                    <td className={styles['qc-td']}><FaMapMarkerAlt style={{marginRight: 6, color: '#fb923c'}} />{caseItem.location}</td>
                    <td className={styles['qc-td']}><FaUserTie style={{marginRight: 6, color: '#0ea5e9'}} />{caseItem.closedBy}</td>
                    <td className={styles['qc-td']}>
                      {caseItem.reviewed ? (
                        <span className={styles['qc-status'] + ' ' + styles['qc-status-reviewed']}><FaCheckCircle style={{marginRight: 4}} />Reviewed</span>
                      ) : (
                        <span className={styles['qc-status'] + ' ' + styles['qc-status-pending']}>Pending</span>
                      )}
                    </td>
                    <td className={styles['qc-td']} style={{textAlign: 'center'}}>
                      {caseItem.reviewed ? (
                        <button className={styles['qc-actionButton']} disabled>Reviewed</button>
                      ) : (
                        <button className={styles['qc-actionButton']} onClick={() => handleReview(caseItem.id)} title="Mark as Reviewed">
                          <FaSearch style={{marginRight: 4}} />Mark Reviewed
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QualityControl; 