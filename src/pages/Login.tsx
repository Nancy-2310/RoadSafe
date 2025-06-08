import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import styles from '../styles/pages/Login.module.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('administrator');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    // For now, we'll just redirect based on role
    switch (selectedRole) {
      case 'administrator':
        window.location.href = '/administrator';
        break;
      case 'field_officer':
        window.location.href = '/field-officer';
        break;
      case 'case_manager':
        window.location.href = '/case-manager';
        break;
      case 'auditor':
        window.location.href = '/auditor';
        break;
      case 'reviewer':
        window.location.href = '/reviewer';
        break;
      default:
        window.location.href = '/administrator';
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-card']}>
        <div className={styles['login-header']}>
          <h1>Road Safe</h1>
          <p>Road Accident Management System</p>
        </div>
        <form onSubmit={handleLogin} className={styles['login-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="username">Username</label>
            <div className={styles['input-group']}>
              <FaUser className={styles['input-icon']} />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="password">Password</label>
            <div className={styles['input-group']}>
              <FaLock className={styles['input-icon']} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="role">Role</label>
            <div className={styles['input-group']}>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={styles['role-select']}
              >
                <option value="administrator">Administrator</option>
                <option value="field_officer">Field Officer</option>
                <option value="case_manager">Case Manager</option>
                <option value="auditor">Auditor</option>
                <option value="reviewer">Reviewer</option>
              </select>
            </div>
          </div>
          <button type="submit" className={styles['login-button']}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 