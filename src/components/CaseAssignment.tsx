import React, { useState } from 'react';
import { FaUserTie, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaExchangeAlt, FaExclamationTriangle } from 'react-icons/fa';
import styles from '../styles/components/CaseAssignment.module.css';

const initialCases = [
  {
    id: 'CASE-1001',
    date: '2024-06-01',
    location: 'Sector 21, New Delhi',
    severity: 'High',
    status: 'Unassigned',
    assignedTo: '',
  },
  {
    id: 'CASE-1002',
    date: '2024-06-02',
    location: 'MG Road, Gurugram',
    severity: 'Medium',
    status: 'Assigned',
    assignedTo: 'Amit Sharma',
  },
  {
    id: 'CASE-1003',
    date: '2024-06-03',
    location: 'Ring Road, Delhi',
    severity: 'High',
    status: 'Unassigned',
    assignedTo: '',
  },
  {
    id: 'CASE-1004',
    date: '2024-06-04',
    location: 'NH-8, Jaipur',
    severity: 'Low',
    status: 'Assigned',
    assignedTo: 'Priya Singh',
  },
];

const caseManagers = [
  'Amit Sharma',
  'Priya Singh',
  'Sunita Verma',
  'Rajesh Gupta',
];

const CaseAssignment: React.FC = () => {
  const [cases, setCases] = useState(initialCases);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [selectedManager, setSelectedManager] = useState('');

  const handleAssignClick = (id: string) => {
    setAssigningId(id);
    setSelectedManager('');
  };

  const handleAssign = (id: string) => {
    if (!selectedManager) return;
    setCases(cases.map(c =>
      c.id === id ? { ...c, status: 'Assigned', assignedTo: selectedManager } : c
    ));
    setAssigningId(null);
    setSelectedManager('');
  };

  return (
    <div className={styles['ca-container']}>
      <div className={styles['ca-card']}>
        <div className={styles['ca-header']}>Case Assignment</div>
        <div style={{overflowX: 'auto'}}>
          <table className={styles['ca-table']}>
            <thead>
              <tr>
                <th className={styles['ca-th']}>Case ID</th>
                <th className={styles['ca-th']}>Date</th>
                <th className={styles['ca-th']}>Location</th>
                <th className={styles['ca-th']}>Severity</th>
                <th className={styles['ca-th']}>Status</th>
                <th className={styles['ca-th']}>Assigned To</th>
                <th className={styles['ca-th']} style={{textAlign: 'center'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles['ca-td']} style={{textAlign: 'center', color: '#aaa'}}>No cases available</td>
                </tr>
              ) : (
                cases.map(caseItem => (
                  <tr key={caseItem.id}>
                    <td className={styles['ca-td']} style={{fontWeight: 600}}>{caseItem.id}</td>
                    <td className={styles['ca-td']}><FaCalendarAlt style={{marginRight: 6, color: '#6366f1'}} />{caseItem.date}</td>
                    <td className={styles['ca-td']}><FaMapMarkerAlt style={{marginRight: 6, color: '#fb923c'}} />{caseItem.location}</td>
                    <td className={styles['ca-td']}>
                      {caseItem.severity === 'High' ? (
                        <span className={styles['ca-severity'] + ' ' + styles['ca-severity-high']}><FaExclamationTriangle style={{marginRight: 4}} />High</span>
                      ) : caseItem.severity === 'Medium' ? (
                        <span className={styles['ca-severity'] + ' ' + styles['ca-severity-medium']}>Medium</span>
                      ) : (
                        <span className={styles['ca-severity'] + ' ' + styles['ca-severity-low']}>Low</span>
                      )}
                    </td>
                    <td className={styles['ca-td']}>
                      {caseItem.status === 'Assigned' ? (
                        <span className={styles['ca-status'] + ' ' + styles['ca-status-assigned']}><FaCheckCircle style={{marginRight: 4}} />Assigned</span>
                      ) : (
                        <span className={styles['ca-status'] + ' ' + styles['ca-status-unassigned']}>Unassigned</span>
                      )}
                    </td>
                    <td className={styles['ca-td']}>
                      {caseItem.assignedTo ? (
                        <span className={styles['ca-assigned']}><FaUserTie style={{marginRight: 4, color: '#0ea5e9'}} />{caseItem.assignedTo}</span>
                      ) : (
                        <span className={styles['ca-unassigned']}>—</span>
                      )}
                    </td>
                    <td className={styles['ca-td']} style={{textAlign: 'center'}}>
                      {assigningId === caseItem.id ? (
                        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                          <select
                            className={styles['ca-select']}
                            value={selectedManager}
                            onChange={e => setSelectedManager(e.target.value)}
                          >
                            <option value="">Select Manager</option>
                            {caseManagers.map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                          <button
                            className={styles['ca-actionButton'] + ' ' + styles['ca-assign']}
                            onClick={() => handleAssign(caseItem.id)}
                            disabled={!selectedManager}
                          >Assign</button>
                          <button
                            className={styles['ca-actionButton'] + ' ' + styles['ca-cancel']}
                            onClick={() => setAssigningId(null)}
                          >Cancel</button>
                        </div>
                      ) : (
                        <button
                          className={styles['ca-actionButton'] + ' ' + styles['ca-assign']}
                          onClick={() => handleAssignClick(caseItem.id)}
                        >
                          {caseItem.status === 'Assigned' ? 'Reassign' : 'Assign'} <FaExchangeAlt style={{marginLeft: 4}} />
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

export default CaseAssignment; 