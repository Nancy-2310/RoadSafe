import React, { useState } from 'react';
import { FaUser, FaLock, FaUserPlus, FaSignInAlt, FaTimes } from 'react-icons/fa';

interface AuthProps {
  onClose: () => void;
  onSubmit: (role: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onClose, onSubmit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: ''
  });

  const roles = [
    'Field Officer',
    'Administrator',
    'Auditor',
    'Reviewer',
    'Case Manager'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.role);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <div className="auth-header">
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
          <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p>{isLogin ? 'Welcome back! Please sign in to continue.' : 'Join us! Create your account to get started.'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                <FaUser className="form-icon" /> Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaUser className="form-icon" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FaLock className="form-icon" /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              <FaUser className="form-icon" /> Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select a role</option>
              {roles.map(role => (
                <option key={role} value={role.toLowerCase().replace(' ', '_')}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="auth-button">
            {isLogin ? (
              <>
                <FaSignInAlt /> Sign In
              </>
            ) : (
              <>
                <FaUserPlus /> Register
              </>
            )}
          </button>

          <button
            type="button"
            className="auth-toggle"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register Now"
              : 'Already have an account? Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth; 