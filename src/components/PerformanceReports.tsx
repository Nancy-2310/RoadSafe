import React from 'react';
import { FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import styles from '../styles/components/PerformanceReports.module.css';

const initialMetrics = [
  {
    id: 'METRIC-1001',
    date: '2024-06-01',
    description: 'System performance review',
    value: '95%',
    status: 'Completed',
  },
  {
    id: 'METRIC-1002',
    date: '2024-06-02',
    description: 'Public report analysis',
    value: '88%',
    status: 'Completed',
  },
  {
    id: 'METRIC-1003',
    date: '2024-06-03',
    description: 'Case validation metrics',
    value: 'Pending',
    status: 'Pending',
  },
  {
    id: 'METRIC-1004',
    date: '2024-06-04',
    description: 'Compliance metrics',
    value: '92%',
    status: 'Completed',
  },
];

const PerformanceReports: React.FC = () => {
  return (
    <div className={styles['pr-dashboard']}>
      <div className={styles['pr-card']}>
        <div className={styles['pr-header']}>Performance Reports</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles['pr-table']}>
            <thead>
              <tr>
                <th className={styles['pr-th']}>Metric ID</th>
                <th className={styles['pr-th']}>Date</th>
                <th className={styles['pr-th']}>Description</th>
                <th className={styles['pr-th']}>Value</th>
                <th className={styles['pr-th']}>Status</th>
              </tr>
            </thead>
            <tbody>
              {initialMetrics.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles['pr-td']} style={{ textAlign: 'center', color: '#aaa' }}>No metrics available</td>
                </tr>
              ) : (
                initialMetrics.map(metric => (
                  <tr key={metric.id}>
                    <td className={styles['pr-td']} style={{ fontWeight: 600 }}>{metric.id}</td>
                    <td className={styles['pr-td']}><FaCalendarAlt style={{ marginRight: 6, color: '#6366f1' }} />{metric.date}</td>
                    <td className={styles['pr-td']}>{metric.description}</td>
                    <td className={styles['pr-td']}><FaChartLine style={{ marginRight: 6, color: '#fb923c' }} />{metric.value}</td>
                    <td className={styles['pr-td']}>
                      {metric.status === 'Completed' ? (
                        <span className={styles['pr-status'] + ' ' + styles['pr-status-completed']}><FaCheckCircle style={{ marginRight: 4 }} />Completed</span>
                      ) : (
                        <span className={styles['pr-status'] + ' ' + styles['pr-status-pending']}><FaExclamationTriangle style={{ marginRight: 4 }} />Pending</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles['pr-card']}>
        <div className={styles['pr-header']}>Notifications</div>
        <div className={styles['pr-notification']}>
          <p>No new notifications at this time.</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports; 