import React from 'react';
import { FaBell, FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaEye, FaChartLine } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Pie, Line, Doughnut, Bar } from 'react-chartjs-2';
import Map from './Map';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

interface AccidentLocation {
  id: number;
  position: [number, number];
  type: string;
  severity: string;
  time: string;
}

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

const FieldOfficer: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Field Officer Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="btn-outline">
            <FaBell className="mr-2" />
            Notifications
          </button>
          <button className="btn-outline">
            <FaMapMarkerAlt className="mr-2" />
            View Map
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Pending Reports</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
            <FaExclamationTriangle className="text-yellow-500 text-2xl" />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Completed Reports</h3>
              <p className="text-3xl font-bold">45</p>
            </div>
            <FaCheckCircle className="text-green-500 text-2xl" />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Cases</h3>
              <p className="text-3xl font-bold">57</p>
            </div>
            <FaChartLine className="text-blue-500 text-2xl" />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Active Areas</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Map Overview */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3>Map Overview</h3>
          <div className="flex gap-2">
            <button className="btn-outline">Refresh</button>
            <button className="btn-outline">Filter</button>
          </div>
        </div>
        <div className="map-container">
          <Map locations={accidentLocations} />
        </div>
      </div>

      {/* Recent Reports */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3>Recent Reports</h3>
          <button className="btn-outline">View All</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((report) => (
            <div key={report} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold">Accident Report #{report}</h4>
                <p className="text-sm text-gray-600">Location: Main Street, City</p>
              </div>
              <button className="btn-outline">
                <FaEye className="mr-2" />
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3>Notifications</h3>
          <button className="btn-outline">Mark All as Read</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((notification) => (
            <div key={notification} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold">New Report Assigned</h4>
                <p className="text-sm text-gray-600">You have been assigned a new accident report.</p>
              </div>
              <button className="btn-outline">
                <FaEye className="mr-2" />
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldOfficer;
