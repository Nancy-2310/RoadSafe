import React, { useState } from 'react';
import { FaCheck, FaTimes, FaUser, FaUserCheck } from 'react-icons/fa';
import styles from '../styles/components/UserManagement.module.css';

const pendingUsers = [
  { id: 1, name: 'Ravi Kumar', email: 'ravi.kumar@email.com', role: 'Field Officer' },
  { id: 2, name: 'Priya Singh', email: 'priya.singh@email.com', role: 'Reviewer' },
  { id: 3, name: 'Amit Sharma', email: 'amit.sharma@email.com', role: 'Case Manager' },
];

const activeUsers = [
  { id: 4, name: 'Sunita Verma', email: 'sunita.verma@email.com', role: 'Administrator' },
  { id: 5, name: 'Rajesh Gupta', email: 'rajesh.gupta@email.com', role: 'Auditor' },
  { id: 6, name: 'Anjali Mehra', email: 'anjali.mehra@email.com', role: 'Field Officer' },
];

const UserManagement: React.FC = () => {
  const [pending, setPending] = useState(pendingUsers);
  const [active, setActive] = useState(activeUsers);

  const handleApprove = (id: number) => {
    const user = pending.find(u => u.id === id);
    if (user) {
      setPending(pending.filter(u => u.id !== id));
      setActive([...active, user]);
    }
  };

  const handleReject = (id: number) => {
    setPending(pending.filter(u => u.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>Pending User Approvals</div>
        <div style={{overflowX: 'auto'}}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Role</th>
                <th className={styles.th} style={{textAlign: 'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.td} style={{textAlign: 'center', color: '#aaa'}}>No pending users</td>
                </tr>
              ) : (
                pending.map(user => (
                  <tr key={user.id}>
                    <td className={styles.td} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><FaUser style={{color: '#fb923c'}} /> {user.name}</td>
                    <td className={styles.td}>{user.email}</td>
                    <td className={styles.td}>{user.role}</td>
                    <td className={styles.td} style={{display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
                      <button className={`${styles.actionButton} ${styles.approve}`} title="Approve" onClick={() => handleApprove(user.id)}><FaCheck /></button>
                      <button className={`${styles.actionButton} ${styles.reject}`} title="Reject" onClick={() => handleReject(user.id)}><FaTimes /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.header}>Active Users</div>
        <div style={{overflowX: 'auto'}}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {active.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.td} style={{textAlign: 'center', color: '#aaa'}}>No active users</td>
                </tr>
              ) : (
                active.map(user => (
                  <tr key={user.id}>
                    <td className={styles.td} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><FaUserCheck style={{color: '#22c55e'}} /> {user.name}</td>
                    <td className={styles.td}>{user.email}</td>
                    <td className={styles.td}>{user.role}</td>
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

export default UserManagement; 