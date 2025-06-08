import React, { useState } from 'react';
import { FaCamera, FaMapMarkerAlt, FaCar, FaUserInjured, FaSave, FaUpload } from 'react-icons/fa';

const AccidentReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    accidentType: '',
    location: '',
    date: '',
    time: '',
    description: '',
    vehicles: [{ type: '', number: '', damage: '' }],
    injuries: [{ type: '', severity: '', description: '' }],
    witnesses: [{ name: '', contact: '', statement: '' }],
    photos: [] as File[],
    gpsCoordinates: '',
    weatherConditions: '',
    roadConditions: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="report-form-container">
      <div className="form-header">
      </div>

      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Accident Type</label>
              <select name="accidentType" value={formData.accidentType} onChange={handleInputChange} required>
                <option value="">Select Type</option>
                <option value="collision">Vehicle Collision</option>
                <option value="pedestrian">Pedestrian Accident</option>
                <option value="single">Single Vehicle Accident</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter accident location"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Vehicle Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Vehicle Type</label>
              <select name="vehicleType" required>
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="truck">Truck</option>
                <option value="bus">Bus</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                placeholder="Enter vehicle number"
                required
              />
            </div>

            <div className="form-group">
              <label>Damage Description</label>
              <textarea
                name="damageDescription"
                placeholder="Describe the damage"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Injury Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Injury Type</label>
              <select name="injuryType" required>
                <option value="">Select Injury Type</option>
                <option value="minor">Minor</option>
                <option value="major">Major</option>
                <option value="fatal">Fatal</option>
                <option value="none">No Injuries</option>
              </select>
            </div>

            <div className="form-group">
              <label>Number of Injured</label>
              <input
                type="number"
                name="injuredCount"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Injury Description</label>
              <textarea
                name="injuryDescription"
                placeholder="Describe the injuries"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Weather Conditions</label>
              <select name="weatherConditions" required>
                <option value="">Select Weather</option>
                <option value="clear">Clear</option>
                <option value="rainy">Rainy</option>
                <option value="foggy">Foggy</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Road Conditions</label>
              <select name="roadConditions" required>
                <option value="">Select Road Condition</option>
                <option value="dry">Dry</option>
                <option value="wet">Wet</option>
                <option value="icy">Icy</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>GPS Coordinates</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt />
                <input
                  type="text"
                  name="gpsCoordinates"
                  placeholder="Enter GPS coordinates"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Photos and Evidence</h3>
          <div className="photo-upload">
            <div className="upload-area">
              <FaCamera />
              <p>Drag and drop photos here or click to upload</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="file-input"
              />
            </div>
            <div className="uploaded-photos">
              {/* Photo previews will be shown here */}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Notes</h3>
          <div className="form-group">
            <textarea
              name="additionalNotes"
              placeholder="Enter any additional information or notes"
              rows={4}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-outline">
            <FaSave /> Save Draft
          </button>
          <button type="submit" className="btn-primary">
            <FaUpload /> Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccidentReportForm; 