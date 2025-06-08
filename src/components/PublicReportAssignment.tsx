import React, { useState } from 'react';
import { FaUserTie, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaExchangeAlt } from 'react-icons/fa';
import styles from '../styles/components/PublicReportAssignment.module.css';

const initialReports = [
  {
    id: 'PR-1001',
    date: '2024-06-01',
    location: 'Sector 21, New Delhi',
    status: 'Unassigned',
    assignedTo: '',
  },
  {
    id: 'PR-1002',
    date: '2024-06-02',
    location: 'MG Road, Gurugram',
    status: 'Assigned',
    assignedTo: 'Amit Sharma',
  },
  {
    id: 'PR-1003',
    date: '2024-06-03',
    location: 'Ring Road, Delhi',
    status: 'Unassigned',
    assignedTo: '',
  },
  {
    id: 'PR-1004',
    date: '2024-06-04',
    location: 'NH-8, Jaipur',
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

const PublicReportAssignment: React.FC = () => {
  const [reports, setReports] = useState(initialReports);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [selectedManager, setSelectedManager] = useState('');

  const handleAssignClick = (id: string) => {
    setAssigningId(id);
    setSelectedManager('');
  };

  const handleAssign = (id: string) => {
    if (!selectedManager) return;
    setReports(reports.map(r =>
      r.id === id ? { ...r, status: 'Assigned', assignedTo: selectedManager } : r
    ));
    setAssigningId(null);
    setSelectedManager('');
  };

  return (
    <div className={styles['pr-container']}>
      <div className={styles['pr-card']}>
        <div className={styles['pr-header']}>Public Report Assignment</div>
        <div style={{overflowX: 'auto'}}>
          <table className={styles['pr-table']}>
            <thead>
              <tr>
                <th className={styles['pr-th']}>Report ID</th>
                <th className={styles['pr-th']}>Date</th>
                <th className={styles['pr-th']}>Location</th>
                <th className={styles['pr-th']}>Status</th>
                <th className={styles['pr-th']}>Assigned To</th>
                <th className={styles['pr-th']} style={{textAlign: 'center'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles['pr-td']} style={{textAlign: 'center', color: '#aaa'}}>No public reports</td>
                </tr>
              ) : (
                reports.map(report => (
                  <tr key={report.id}>
                    <td className={styles['pr-td']} style={{fontWeight: 600}}>{report.id}</td>
                    <td className={styles['pr-td']}><FaCalendarAlt style={{marginRight: 6, color: '#6366f1'}} />{report.date}</td>
                    <td className={styles['pr-td']}><FaMapMarkerAlt style={{marginRight: 6, color: '#fb923c'}} />{report.location}</td>
                    <td className={styles['pr-td']}>
                      {report.status === 'Assigned' ? (
                        <span className={styles['pr-status'] + ' ' + styles['pr-status-assigned']}><FaCheckCircle style={{marginRight: 4}} />Assigned</span>
                      ) : (
                        <span className={styles['pr-status'] + ' ' + styles['pr-status-unassigned']}>Unassigned</span>
                      )}
                    </td>
                    <td className={styles['pr-td']}>
                      {report.assignedTo ? (
                        <span className={styles['pr-assigned']}><FaUserTie style={{marginRight: 4, color: '#0ea5e9'}} />{report.assignedTo}</span>
                      ) : (
                        <span className={styles['pr-unassigned']}>—</span>
                      )}
                    </td>
                    <td className={styles['pr-td']} style={{textAlign: 'center'}}>
                      {assigningId === report.id ? (
                        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                          <select
                            className={styles['pr-select']}
                            value={selectedManager}
                            onChange={e => setSelectedManager(e.target.value)}
                          >
                            <option value="">Select Manager</option>
                            {caseManagers.map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                          <button
                            className={styles['pr-actionButton'] + ' ' + styles['pr-assign']}
                            onClick={() => handleAssign(report.id)}
                            disabled={!selectedManager}
                          >Assign</button>
                          <button
                            className={styles['pr-actionButton'] + ' ' + styles['pr-cancel']}
                            onClick={() => setAssigningId(null)}
                          >Cancel</button>
                        </div>
                      ) : (
                        <button
                          className={styles['pr-actionButton'] + ' ' + styles['pr-assign']}
                          onClick={() => handleAssignClick(report.id)}
                        >
                          {report.status === 'Assigned' ? 'Reassign' : 'Assign'} <FaExchangeAlt style={{marginLeft: 4}} />
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

export default PublicReportAssignment; 