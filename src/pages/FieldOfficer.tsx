import React, { useState } from 'react';
import { FaHome, FaFileAlt, FaComments, FaSignOutAlt, FaBars, FaUserCircle } from 'react-icons/fa';
import FieldOfficerDashboard from '../components/FieldOfficerDashboard';
import AccidentReportForm from '../components/AccidentReportForm';
import Messages from '../components/Messages';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const FieldOfficer: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <FieldOfficerDashboard />;
      case 'report':
        return <AccidentReportForm />;
      case 'messages':
        return <Messages />;
      default:
        return <FieldOfficerDashboard />;
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '1rem',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    marginTop: '2rem',
  };
  const center = { lat: 28.4089, lng: 77.3178 }; // Faridabad center
  const accidentMarkers = [
    { id: 1, position: { lat: 28.4089, lng: 77.3178 }, label: 'A' },
    { id: 2, position: { lat: 28.4189, lng: 77.3278 }, label: 'B' },
    { id: 3, position: { lat: 28.3989, lng: 77.3078 }, label: 'C' },
  ];

  return (
    <div className="field-officer-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-text">Road Safe</div>
          <button 
            className="toggle-sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
          >
            <FaHome />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${activePage === 'report' ? 'active' : ''}`}
            onClick={() => setActivePage('report')}
          >
            <FaFileAlt />
            <span>Accident Report</span>
          </button>

          <button
            className={`nav-item ${activePage === 'messages' ? 'active' : ''}`}
            onClick={() => setActivePage('messages')}
          >
            <FaComments />
            <span>Messages</span>
          </button>

          <button
            className="nav-item logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <main className="main-content">
        <header className="content-header">
          <h1>
            {activePage === 'dashboard' && 'Field Officer Dashboard'}
            {activePage === 'report' && 'Accident Report Form'}
            {activePage === 'messages' && 'Messages'}
          </h1>
          <div className="user-info">
            <div className="user-profile">
              <FaUserCircle className="user-avatar" />
              <div className="user-details">
                <span className="user-name">John Doe</span>
                <span className="user-role">Field Officer</span>
              </div>
            </div>
          </div>
        </header>

        <div className="content-area">
          {renderContent()}

          {/* Google Map Overview */}
          <div className="dashboard-card mt-8">
            <h3 className="text-xl font-bold mb-4">Map Overview</h3>
            <LoadScript googleMapsApiKey="AIzaSyCJPsydxbZLfO6MAMEtiMy1bS7DAjbw_tQ">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: false,
                  styles: [
                    { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
                    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                    { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
                    { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
                    {
                      featureType: 'administrative.land_parcel',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#bdbdbd' }],
                    },
                    {
                      featureType: 'poi',
                      elementType: 'geometry',
                      stylers: [{ color: '#eeeeee' }],
                    },
                    {
                      featureType: 'poi',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#757575' }],
                    },
                    {
                      featureType: 'poi.park',
                      elementType: 'geometry',
                      stylers: [{ color: '#e5e5e5' }],
                    },
                    {
                      featureType: 'poi.park',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#9e9e9e' }],
                    },
                    {
                      featureType: 'road',
                      elementType: 'geometry',
                      stylers: [{ color: '#ffffff' }],
                    },
                    {
                      featureType: 'road.arterial',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#757575' }],
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'geometry',
                      stylers: [{ color: '#dadada' }],
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#616161' }],
                    },
                    {
                      featureType: 'road.local',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#9e9e9e' }],
                    },
                    {
                      featureType: 'transit.line',
                      elementType: 'geometry',
                      stylers: [{ color: '#e5e5e5' }],
                    },
                    {
                      featureType: 'transit.station',
                      elementType: 'geometry',
                      stylers: [{ color: '#eeeeee' }],
                    },
                    {
                      featureType: 'water',
                      elementType: 'geometry',
                      stylers: [{ color: '#c9c9c9' }],
                    },
                    {
                      featureType: 'water',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#9e9e9e' }],
                    },
                  ],
                }}
              >
                {accidentMarkers.map(marker => (
                  <Marker key={marker.id} position={marker.position} label={marker.label} />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FieldOfficer; 