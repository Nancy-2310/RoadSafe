import React from 'react';
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaChartLine, FaMapMarkerAlt, FaTimesCircle, FaEye } from 'react-icons/fa';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'leaflet/dist/leaflet.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AccidentLocation {
  id: number;
  position: [number, number];
  type: string;
  severity: string;
  time: string;
}

const FieldOfficerDashboard: React.FC = () => {
  // Sample data for charts
  const accidentTypeData = {
    labels: ['Vehicle Collision', 'Pedestrian', 'Single Vehicle', 'Other'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#3182ce', '#38a169', '#d69e2e', '#e53e3e'],
        borderWidth: 0,
      },
    ],
  };

  const monthlyTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Accidents',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#3182ce',
        backgroundColor: 'rgba(49, 130, 206, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const severityData = {
    labels: ['Minor', 'Major', 'Fatal'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#38a169', '#d69e2e', '#e53e3e'],
        borderWidth: 0,
      },
    ],
  };

  const timeDistributionData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Accidents',
        data: [5, 3, 8, 12, 15, 10],
        backgroundColor: 'rgba(49, 130, 206, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  // Sample accident locations
  const accidentLocations: AccidentLocation[] = [
    {
      id: 1,
      position: [51.505, -0.09],
      type: 'Vehicle Collision',
      severity: 'High',
      time: '10:30 AM'
    },
    {
      id: 2,
      position: [51.51, -0.1],
      type: 'Pedestrian Accident',
      severity: 'Medium',
      time: '11:45 AM'
    },
    {
      id: 3,
      position: [51.515, -0.095],
      type: 'Vehicle Collision',
      severity: 'Low',
      time: '2:15 PM'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="date-filter">
          <select className="form-select">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon pending">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <h3>Pending Reports</h3>
            <p className="stat-value">12</p>
            <p className="stat-change positive">+2 from yesterday</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>Completed Reports</h3>
            <p className="stat-value">45</p>
            <p className="stat-change positive">+5 from yesterday</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon total">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>Total Cases</h3>
            <p className="stat-value">57</p>
            <p className="stat-change">This month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon location">
            <FaMapMarkerAlt />
          </div>
          <div className="stat-info">
            <h3>Active Areas</h3>
            <p className="stat-value">3</p>
            <p className="stat-change">Currently assigned</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Accident Types Distribution</h3>
          </div>
          <div className="chart-container">
            <Pie data={accidentTypeData} options={chartOptions} />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Monthly Trend</h3>
          </div>
          <div className="chart-container">
            <Line data={monthlyTrendData} options={chartOptions} />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Accident Severity</h3>
          </div>
          <div className="chart-container">
            <Doughnut data={severityData} options={chartOptions} />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Time Distribution</h3>
          </div>
          <div className="chart-container">
            <Bar data={timeDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card recent-reports">
          <div className="card-header">
            <h3>Recent Reports</h3>
            <button className="btn-text">View All</button>
          </div>
          <div className="reports-list">
            {[1, 2, 3].map((report) => (
              <div key={report} className="report-item">
                <div className="report-info">
                  <h4>Accident Report #{report}</h4>
                  <p>Location: Sector {report + 10}, Faridabad</p>
                </div>
                <div className="report-status pending">Pending Review</div>
              </div>
            ))}
          </div>
        </div>

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
                  <p>New accident report assigned to you</p>
                  <span className="notification-time">2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldOfficerDashboard; 