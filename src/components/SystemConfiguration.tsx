import React, { useState } from 'react';
import styles from '../styles/components/SystemConfiguration.module.css';

const SystemConfiguration: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoAssign: false,
    theme: 'light',
    maxCasesPerManager: 10,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className={styles['sc-container']}>
      <div className={styles['sc-card']}>
        <div className={styles['sc-header']}>System Configuration</div>
        <form className={styles['sc-form']} onSubmit={handleSave}>
          <div className={styles['sc-formGroup']}>
            <label className={styles['sc-label']} htmlFor="notifications">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className={styles['sc-switch']}
              />
              Enable Notifications
            </label>
          </div>
          <div className={styles['sc-formGroup']}>
            <label className={styles['sc-label']} htmlFor="autoAssign">
              <input
                type="checkbox"
                id="autoAssign"
                name="autoAssign"
                checked={settings.autoAssign}
                onChange={handleChange}
                className={styles['sc-switch']}
              />
              Auto-assign Cases to Managers
            </label>
          </div>
          <div className={styles['sc-formGroup']}>
            <label className={styles['sc-label']} htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className={styles['sc-select']}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          <div className={styles['sc-formGroup']}>
            <label className={styles['sc-label']} htmlFor="maxCasesPerManager">Max Cases per Manager</label>
            <input
              type="number"
              id="maxCasesPerManager"
              name="maxCasesPerManager"
              min={1}
              max={100}
              value={settings.maxCasesPerManager}
              onChange={handleChange}
              className={styles['sc-input']}
            />
          </div>
          <button type="submit" className={styles['sc-saveButton']}>Save Settings</button>
          {saved && <div className={styles['sc-success']}>Settings saved successfully!</div>}
        </form>
      </div>
    </div>
  );
};

export default SystemConfiguration; 