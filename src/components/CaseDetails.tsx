import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle, FaUserTie, FaUpload } from 'react-icons/fa';
import styles from '../styles/components/CaseDetails.module.css';

const initialCase = {
  id: 'CASE-1001',
  date: '2024-06-01',
  location: 'Sector 21, New Delhi',
  severity: 'High',
  status: 'Assigned',
  assignedTo: 'Amit Sharma',
};

const CaseDetails: React.FC = () => {
  const [caseDetails, setCaseDetails] = useState(initialCase);
  const [firFile, setFirFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCaseDetails({ ...caseDetails, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFirFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., sending data to a server
    console.log('Case Details:', caseDetails);
    console.log('FIR File:', firFile);
  };

  return (
    <div className={styles['cd-container']}>
      <div className={styles['cd-card']}>
        <div className={styles['cd-header']}>Update Case Details</div>
        <form onSubmit={handleSubmit}>
          <div className={styles['cd-form-group']}>
            <label>Case ID</label>
            <input type="text" name="id" value={caseDetails.id} onChange={handleInputChange} readOnly />
          </div>
          <div className={styles['cd-form-group']}>
            <label>Date</label>
            <input type="date" name="date" value={caseDetails.date} onChange={handleInputChange} />
          </div>
          <div className={styles['cd-form-group']}>
            <label>Location</label>
            <input type="text" name="location" value={caseDetails.location} onChange={handleInputChange} />
          </div>
          <div className={styles['cd-form-group']}>
            <label>Severity</label>
            <select name="severity" value={caseDetails.severity} onChange={handleInputChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className={styles['cd-form-group']}>
            <label>Status</label>
            <select name="status" value={caseDetails.status} onChange={handleInputChange}>
              <option value="Assigned">Assigned</option>
              <option value="Unassigned">Unassigned</option>
            </select>
          </div>
          <div className={styles['cd-form-group']}>
            <label>Assigned To</label>
            <input type="text" name="assignedTo" value={caseDetails.assignedTo} onChange={handleInputChange} />
          </div>
          <div className={styles['cd-form-group']}>
            <label>Upload FIR</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit" className={styles['cd-submit']}>Update Case</button>
        </form>
      </div>
    </div>
  );
};

export default CaseDetails; 