import React, { useState } from 'react';
import styles from '../styles/pages/Login.module.css';

const palette = {
  primary: '#1E3A8A',
  accent: '#B91C1C',
  background: '#F9FAFB',
  info: '#0EA5E9',
  border: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  success: '#10B981',
};

const roleDescriptions: Record<string, string> = {
  'field-officer': '👮‍♂️ Field data collection, incident reporting, and on-site documentation',
  'administrator': '⚙️ System management, user control, and configuration settings',
  'case-manager': '📋 Case tracking, workflow management, and status updates',
  'auditor': '🔍 Data verification, compliance checking, and quality assurance',
  'reviewer': '✅ Final approval, review processes, and decision making',
};

const roleOptions = [
  { value: '', label: 'Select your role' },
  { value: 'field-officer', label: 'Field Officer' },
  { value: 'administrator', label: 'Administrator' },
  { value: 'case-manager', label: 'Case Manager' },
  { value: 'auditor', label: 'Auditor' },
  { value: 'reviewer', label: 'Reviewer' },
];

const AuthPage: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [login, setLogin] = useState({ email: '', password: '', role: '' });
  const [signup, setSignup] = useState({ name: '', email: '', password: '', confirm: '', role: '' });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loginError, setLoginError] = useState<{ email?: string; password?: string; role?: string }>({});
  const [signupError, setSignupError] = useState<{ name?: string; email?: string; password?: string; confirm?: string; role?: string }>({});
  const [signupStrength, setSignupStrength] = useState(0);
  const [signupStrengthColor, setSignupStrengthColor] = useState(palette.border);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [roleDesc, setRoleDesc] = useState('');

  // Password strength logic
  function getPasswordStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  }

  function handleTabSwitch(tabName: 'login' | 'signup') {
    setTab(tabName);
    setInfo('');
    setLoginError({});
    setSignupError({});
  }

  function handleLoginChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setLoginError({ ...loginError, [e.target.name]: undefined });
  }

  function handleSignupChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    setSignupError({ ...signupError, [e.target.name]: undefined });
    if (e.target.name === 'role') {
      setRoleDesc(roleDescriptions[e.target.value] || '');
    }
    if (e.target.name === 'password') {
      const strength = getPasswordStrength(e.target.value);
      setSignupStrength(strength);
      setSignupStrengthColor([
        palette.accent,
        palette.accent,
        '#F59E0B',
        palette.success,
        palette.success,
      ][strength - 1] || palette.border);
    }
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function redirectToDashboard(role: string) {
    switch (role) {
      case 'field-officer':
        window.location.href = '/field-officer';
        break;
      case 'administrator':
        window.location.href = '/administrator';
        break;
      case 'case-manager':
        window.location.href = '/case-manager';
        break;
      case 'auditor':
        window.location.href = '/auditor';
        break;
      case 'reviewer':
        window.location.href = '/reviewer';
        break;
      default:
        window.location.href = '/';
    }
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    let error: typeof loginError = {};
    if (!validateEmail(login.email)) error.email = 'Enter a valid email address';
    if (!login.role) error.role = 'Select your role';
    if (login.password.length < 8) error.password = 'Password must be at least 8 characters';
    setLoginError(error);
    if (Object.keys(error).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      redirectToDashboard(login.role);
    }, 1500);
  }

  function handleSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    let error: typeof signupError = {};
    if (signup.name.length < 2) error.name = 'Enter your full name';
    if (!validateEmail(signup.email)) error.email = 'Enter a valid email address';
    if (!signup.role) error.role = 'Select your role';
    if (getPasswordStrength(signup.password) < 4)
      error.password = 'Password must be strong (uppercase, lowercase, number, special)';
    if (signup.password !== signup.confirm) error.confirm = 'Passwords do not match';
    setSignupError(error);
    if (Object.keys(error).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      redirectToDashboard(signup.role);
    }, 2000);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['auth-card']}>
        <div className={styles['logo-section']}>
          <div className={styles['logo']}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2zM12 4.8L17.6 19.5l-5.6-2.4-5.6 2.4L12 4.8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div className={styles['logo-text']}>Road Safe</div>
          <div className={styles['logo-subtitle']}>Accident Data Management System</div>
        </div>
        <div className={styles['info-banner']}>
          <h3>🛡️ Secure Access Portal</h3>
          <p>Protecting critical road safety data with advanced security</p>
        </div>
        <div className={styles['tab-container']}>
          <button
            className={tab === 'login' ? styles['tab-btn'] + ' ' + styles['active'] : styles['tab-btn']}
            onClick={() => handleTabSwitch('login')}
            type="button"
          >
            Sign In
          </button>
          <button
            className={tab === 'signup' ? styles['tab-btn'] + ' ' + styles['active'] : styles['tab-btn']}
            onClick={() => handleTabSwitch('signup')}
            type="button"
          >
            Sign Up
          </button>
        </div>
        {/* Login Form */}
        <div className={tab === 'login' ? styles['form-section'] + ' ' + styles['active'] : styles['form-section']}>
          <form onSubmit={handleLoginSubmit} autoComplete="on">
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Email Address</label>
              <input
                type="email"
                className={styles['form-input'] + (loginError.email ? ' ' + styles['error'] : '')}
                name="email"
                placeholder="Enter your email"
                value={login.email}
                onChange={handleLoginChange}
                required
                autoComplete="username"
              />
              {loginError.email && <div className={styles['error-message']}>{loginError.email}</div>}
            </div>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Role/Access Level</label>
              <select
                className={styles['form-input'] + (loginError.role ? ' ' + styles['error'] : '')}
                name="role"
                value={login.role}
                onChange={handleLoginChange}
                required
              >
                {roleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {loginError.role && <div className={styles['error-message']}>{loginError.role}</div>}
            </div>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Password</label>
              <div className={styles['password-wrapper']}>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  className={styles['form-input'] + (loginError.password ? ' ' + styles['error'] : '')}
                  name="password"
                  placeholder="Enter your password"
                  value={login.password}
                  onChange={handleLoginChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles['password-toggle']}
                  onClick={() => setShowLoginPassword(v => !v)}
                  tabIndex={-1}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </button>
              </div>
              {loginError.password && <div className={styles['error-message']}>{loginError.password}</div>}
            </div>
            <button type="submit" className={styles['auth-btn']} disabled={loading}>
              {loading && <span className={styles['spinner']} />}
              <span>{loading ? 'Signing In...' : 'Sign In Securely'}</span>
            </button>
          </form>
          <div className={styles['forgot-password']}>
            <a href="#" className={styles['link']}>Forgot your password?</a>
          </div>
        </div>
        {/* Signup Form */}
        <div className={tab === 'signup' ? styles['form-section'] + ' ' + styles['active'] : styles['form-section']}>
          <form onSubmit={handleSignupSubmit} autoComplete="on">
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Full Name</label>
              <input
                type="text"
                className={styles['form-input'] + (signupError.name ? ' ' + styles['error'] : '')}
                name="name"
                placeholder="Enter your full name"
                value={signup.name}
                onChange={handleSignupChange}
                required
                autoComplete="name"
              />
              {signupError.name && <div className={styles['error-message']}>{signupError.name}</div>}
            </div>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Email Address</label>
              <input
                type="email"
                className={styles['form-input'] + (signupError.email ? ' ' + styles['error'] : '')}
                name="email"
                placeholder="Enter your email"
                value={signup.email}
                onChange={handleSignupChange}
                required
                autoComplete="email"
              />
              {signupError.email && <div className={styles['error-message']}>{signupError.email}</div>}
            </div>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Role/Access Level</label>
              <select
                className={styles['form-input'] + (signupError.role ? ' ' + styles['error'] : '')}
                name="role"
                value={signup.role}
                onChange={handleSignupChange}
                required
              >
                {roleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {signupError.role && <div className={styles['error-message']}>{signupError.role}</div>}
              {roleDesc && <div className={styles['role-description']}>{roleDesc}</div>}
            </div>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Password</label>
              <div className={styles['password-wrapper']}>
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  className={styles['form-input'] + (signupError.password ? ' ' + styles['error'] : '')}
                  name="password"
                  placeholder="Create a strong password"
                  value={signup.password}
                  onChange={handleSignupChange}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles['password-toggle']}
                  onClick={() => setShowSignupPassword(v => !v)}
                  tabIndex={-1}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </button>
              </div>
              <div className={styles['strength-meter']}>
                <div
                  className={styles['strength-fill']}
                  style={{ width: `${signupStrength * 20}%`, background: signupStrengthColor }}
                />
              </div>
              {signupError.password && <div className={styles['error-message']}>{signupError.password}</div>}
            </div>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Confirm Password</label>
              <input
                type="password"
                className={styles['form-input'] + (signupError.confirm ? ' ' + styles['error'] : '')}
                name="confirm"
                placeholder="Confirm your password"
                value={signup.confirm}
                onChange={handleSignupChange}
                required
                autoComplete="new-password"
              />
              {signupError.confirm && <div className={styles['error-message']}>{signupError.confirm}</div>}
            </div>
            <button type="submit" className={styles['auth-btn']} disabled={loading}>
              {loading && <span className={styles['spinner']} />}
              <span>{loading ? 'Creating Account...' : 'Create Secure Account'}</span>
            </button>
          </form>
        </div>
        {info && <div className={styles['success-message']}>{info}</div>}
      </div>
    </div>
  );
};

export default AuthPage; 