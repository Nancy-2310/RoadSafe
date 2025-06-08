import React from 'react';
import { FaBell, FaClipboardList, FaCheckCircle, FaExclamationTriangle, FaChartBar, FaMapMarkerAlt } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const monthlyReportsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Reports',
      data: [120, 150, 180, 130, 170, 200, 220, 210],
      backgroundColor: '#ff6b35',
      borderRadius: 8,
    },
  ],
};

const caseStatusData = {
  labels: ['Open', 'Closed', 'Pending Review'],
  datasets: [
    {
      data: [87, 1158, 23],
      backgroundColor: ['#3182ce', '#38a169', '#ff6b35'],
      borderWidth: 0,
    },
  ],
};

const AdministratorDashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="text-2xl font-bold mb-4">Welcome, Administrator</h2>
      </div>
      <div className="stats-grid mb-8">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaClipboardList />
          </div>
          <div className="stat-info">
            <h3>Total Reports</h3>
            <p className="stat-value">1,245</p>
            <p className="stat-change positive">+12 today</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <h3>Open Cases</h3>
            <p className="stat-value">87</p>
            <p className="stat-change">5 new</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>Closed Cases</h3>
            <p className="stat-value">1,158</p>
            <p className="stat-change positive">+8 this week</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <FaChartBar />
          </div>
          <div className="stat-info">
            <h3>Analytics</h3>
            <p className="stat-value">View</p>
            <p className="stat-change">Charts & Hotspots</p>
          </div>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card notifications">
          <div className="card-header">
            <h3>Notifications</h3>
            <button className="btn-text">Mark All Read</button>
          </div>
          <div className="notifications-list">
            {[1, 2, 3].map((notification) => (
              <div key={notification} className="notification-item">
                <div className="notification-icon">
                  <FaBell />
                </div>
                <div className="notification-content">
                  <p>New report submitted by Field Officer</p>
                  <span className="notification-time">1 hour ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Case Management Overview</h3>
          </div>
          <div className="reports-list">
            <div className="report-item">
              <div className="report-info">
                <h4>Case #A-1023</h4>
                <p>Status: Open | Assigned to: Officer Sharma</p>
              </div>
              <div className="report-status pending">Pending Review</div>
            </div>
            <div className="report-item">
              <div className="report-info">
                <h4>Case #A-1019</h4>
                <p>Status: Closed | Assigned to: Officer Singh</p>
              </div>
              <div className="report-status completed">Closed</div>
            </div>
            <div className="report-item">
              <div className="report-info">
                <h4>Case #A-1015</h4>
                <p>Status: Open | Assigned to: Officer Verma</p>
              </div>
              <div className="report-status pending">Pending Review</div>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Reporting & Analytics</h3>
          </div>
          <div className="chart-container flex flex-col items-center justify-center min-h-[220px]">
            <div className="w-full max-w-[400px] mb-8">
              <Bar data={monthlyReportsData} options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { color: '#eee' } } },
              }} />
            </div>
            <div className="w-full max-w-[300px] mb-8">
              <Pie data={caseStatusData} options={{
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
              }} />
            </div>
          </div>
        </div>
        {/* Accident Hotspots Map Section */}
        <div className="dashboard-card mt-8">
          <div className="card-header">
            <h3>Accident Hotspots Map <span className="text-gray-400 text-base">(Coming Soon)</span></h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-gray-100 h-40 w-full max-w-[400px] flex items-center justify-center text-gray-400">[Map Placeholder]</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministratorDashboard; 