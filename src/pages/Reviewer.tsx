import React, { useState } from 'react';
import { FaHome, FaClipboardCheck, FaEnvelope, FaSignOutAlt, FaBars, FaUserCircle, FaBell } from 'react-icons/fa';
import '../App.css';
import styles from '../styles/pages/Reviewer.module.css';

interface Report {
  id: string;
  date: string;
  location: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedBy: string;
}

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
}

const initialReports: Report[] = [
  {
    id: 'REP-1001',
    date: '2024-03-15',
    location: 'Sector 21, New Delhi',
    severity: 'High',
    status: 'Pending',
    submittedBy: 'Amit Sharma'
  },
  {
    id: 'REP-1002',
    date: '2024-03-14',
    location: 'MG Road, Gurugram',
    severity: 'Medium',
    status: 'Approved',
    submittedBy: 'Priya Singh'
  },
  {
    id: 'REP-1003',
    date: '2024-03-13',
    location: 'Ring Road, Delhi',
    severity: 'Low',
    status: 'Rejected',
    submittedBy: 'Rajesh Kumar'
  }
];

const initialMessages: Message[] = [
  {
    id: 'MSG-001',
    from: 'Amit Sharma',
    subject: 'Urgent: Case Validation Required',
    content: 'Please review the attached case report for validation.',
    date: '2024-03-15',
    isRead: false
  },
  {
    id: 'MSG-002',
    from: 'Priya Singh',
    subject: 'Case Update',
    content: 'The case has been updated with new evidence.',
    date: '2024-03-14',
    isRead: true
  }
];

const Reviewer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [notifications, setNotifications] = useState(3);

  const handleApprove = (id: string) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: 'Approved' } : report
    ));
  };

  const handleReject = (id: string) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: 'Rejected' } : report
    ));
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className={styles['dashboard-content']}>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Pending Reports</h3>
          <p className={styles['stat-number']}>{reports.filter(r => r.status === 'Pending').length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Approved Reports</h3>
          <p className={styles['stat-number']}>{reports.filter(r => r.status === 'Approved').length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Rejected Reports</h3>
          <p className={styles['stat-number']}>{reports.filter(r => r.status === 'Rejected').length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Unread Messages</h3>
          <p className={styles['stat-number']}>{messages.filter(m => !m.isRead).length}</p>
        </div>
      </div>
      <div className="dashboard-card" style={{marginTop: '1.5rem'}}>
        <h3>Recent Reports</h3>
        <div className={styles['reports-table']}>
          <table>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Date</th>
                <th>Location</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Submitted By</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.slice(0, 5).map(report => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.date}</td>
                  <td>{report.location}</td>
                  <td>
                    <span className={`${styles['severity']} ${styles[`severity-${report.severity.toLowerCase()}`]}`}>
                      {report.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles['status']} ${styles[`status-${report.status.toLowerCase()}`]}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>{report.submittedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderValidation = () => (
    <div className={styles['validation-content']}>
      <div className={styles['validation-header']}>
        <h2>Report Validation</h2>
        <div className={styles['header-actions']}>
          <div className={styles['search-bar']}>
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles['filter-dropdown']}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles['reports-table']}>
        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Date</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Submitted By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.date}</td>
                <td>{report.location}</td>
                <td>
                  <span className={`${styles['severity']} ${styles[`severity-${report.severity.toLowerCase()}`]}`}>
                    {report.severity}
                  </span>
                </td>
                <td>
                  <span className={`${styles['status']} ${styles[`status-${report.status.toLowerCase()}`]}`}>
                    {report.status}
                  </span>
                </td>
                <td>{report.submittedBy}</td>
                <td>
                  {report.status === 'Pending' && (
                    <div className={styles['action-buttons']}>
                      <button
                        className={`${styles['action-button']} ${styles['approve']}`}
                        onClick={() => handleApprove(report.id)}
                      >
                        Approve
                      </button>
                      <button
                        className={`${styles['action-button']} ${styles['reject']}`}
                        onClick={() => handleReject(report.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className={styles['messages-content']}>
      <h2>Messages</h2>
      <div className={styles['messages-list']}>
        {messages.map(message => (
          <div key={message.id} className={`${styles['message-card']} ${!message.isRead ? styles['unread'] : ''}`}>
            <div className={styles['message-header']}>
              <span className={styles['message-from']}>{message.from}</span>
              <span className={styles['message-date']}>{message.date}</span>
            </div>
            <h3 className={styles['message-subject']}>{message.subject}</h3>
            <p className={styles['message-content']}>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles['reviewer-container']}>
      <div className={`${styles['sidebar']} ${isSidebarOpen ? styles['open'] : styles['closed']}`}>
        <div className={styles['sidebar-header']}>
          <div className={styles['logo-text']}>Road Safe</div>
          <button 
            className={styles['toggle-sidebar']}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        <nav className={styles['sidebar-nav']}>
          <button
            className={`${styles['nav-item']} ${currentPage === 'dashboard' ? styles['active'] : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <FaHome />
            <span>Dashboard</span>
          </button>

          <button
            className={`${styles['nav-item']} ${currentPage === 'validation' ? styles['active'] : ''}`}
            onClick={() => setCurrentPage('validation')}
          >
            <FaClipboardCheck />
            <span>Report Validation</span>
          </button>

          <button
            className={`${styles['nav-item']} ${currentPage === 'messages' ? styles['active'] : ''}`}
            onClick={() => setCurrentPage('messages')}
          >
            <FaEnvelope />
            <span>Messages</span>
          </button>

          <button
            className={`${styles['nav-item']} ${styles['logout']}`}
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <main className={styles['main-content']}>
        <header className={styles['content-header']}>
          <h1>
            {currentPage === 'dashboard' && 'Reviewer Dashboard'}
            {currentPage === 'validation' && 'Report Validation'}
            {currentPage === 'messages' && 'Messages'}
          </h1>
          <div className={styles['user-info']}>
            <div className={styles['user-profile']}>
              <FaUserCircle className={styles['user-avatar']} />
              <div className={styles['user-details']}>
                <span className={styles['user-name']}>Reviewer User</span>
                <span className={styles['user-role']}>Reviewer</span>
              </div>
            </div>
          </div>
        </header>

        <div className={styles['content-area']}>
          {currentPage === 'dashboard' && renderDashboard()}
          {currentPage === 'validation' && renderValidation()}
          {currentPage === 'messages' && renderMessages()}
        </div>
      </main>
    </div>
  );
};

export default Reviewer; 