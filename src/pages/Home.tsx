import React from 'react';
import { FaChartLine, FaShieldAlt, FaChartBar, FaUserTie, FaUserShield, FaUserCog, FaUserCheck } from 'react-icons/fa';
import styles from '../styles/pages/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles['home-container']}>
      <header className={styles['home-header']}>
        <div className={styles['header-content']}>
          <div className={styles['logo-section']}>
            <div className={styles['logo-icon']}>RS</div>
            <div className={styles['logo-text']}>Road Safe</div>
          </div>
          <nav className={styles['nav-menu']}>
            <a href="#features" className={styles['nav-link']}>Features</a>
            <a href="#about" className={styles['nav-link']}>About</a>
            <a href="#contact" className={styles['nav-link']}>Contact</a>
          </nav>
          <div className={styles['auth-buttons']}>
            <a href="/login" className={styles['btn'] + ' ' + styles['btn-outline']}>
              Sign In
            </a>
          </div>
        </div>
      </header>

      <main className={styles['main-content']}>
        <section className={styles['hero']}>
          <div className={styles['hero-content']}>
            <h1>Road Safe <span className={styles['highlight']}>Management System</span></h1>
            <p>Streamlining accident reporting, validation, and case management for the Faridabad Police Department. A comprehensive solution for efficient data handling and analysis.</p>
            
            <div className={styles['hero-cta']}>
              <a href="/login" className={styles['btn'] + ' ' + styles['btn-solid'] + ' ' + styles['btn-large']}>Get Started</a>
              <a href="#features" className={styles['btn'] + ' ' + styles['btn-outline'] + ' ' + styles['btn-large']}>Learn More</a>
            </div>
            
            <div className={styles['hero-metrics']}>
              <div className={styles['metric']}>
                <span className={styles['metric-value']}>24/7</span>
                <span className={styles['metric-label']}>Real-time Reporting</span>
              </div>
              <div className={styles['metric']}>
                <span className={styles['metric-value']}>5+</span>
                <span className={styles['metric-label']}>User Roles</span>
              </div>
              <div className={styles['metric']}>
                <span className={styles['metric-value']}>100%</span>
                <span className={styles['metric-label']}>Compliance</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className={styles['features']}>
          <div className={styles['features-container']}>
            <div className={styles['section-header']}>
              <h2 className={styles['section-title']}>Comprehensive <span className={styles['highlight']}>Data Management</span></h2>
              <p className={styles['section-subtitle']}>A robust system designed for efficient accident data handling, case management, and analysis with role-based access control.</p>
            </div>
            
            <div className={styles['features-grid']}>
              <div className={styles['feature-card']}>
                <div className={styles['feature-icon']}><FaUserTie /></div>
                <h3 className={styles['feature-title']}>Field Officer Portal</h3>
                <p className={styles['feature-description']}>Streamlined interface for officers to verify public reports, submit formal reports, and capture crucial accident data including photos, videos, and GPS coordinates.</p>
              </div>
              
              <div className={styles['feature-card']}>
                <div className={styles['feature-icon']}><FaUserCog /></div>
                <h3 className={styles['feature-title']}>Review & Validation</h3>
                <p className={styles['feature-description']}>Comprehensive review system for validating reports, classifying cases, and managing complex investigations with automated prompts and clarification requests.</p>
              </div>
              
              <div className={styles['feature-card']}>
                <div className={styles['feature-icon']}><FaChartBar /></div>
                <h3 className={styles['feature-title']}>Analytics Dashboard</h3>
                <p className={styles['feature-description']}>Advanced analytics and visualization tools for monitoring accident trends, generating reports, and making data-driven decisions for road safety improvements.</p>
              </div>
              
              <div className={styles['feature-card']}>
                <div className={styles['feature-icon']}><FaShieldAlt /></div>
                <h3 className={styles['feature-title']}>Compliance & Security</h3>
                <p className={styles['feature-description']}>Built-in compliance with Digital Personal Data Protection Act, 2023 and Motor Vehicles Act, 1988, ensuring data security and privacy.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles['cta']}>
          <div className={styles['cta-container']}>
            <h2 className={styles['cta-title']}>Ready to Get Started?</h2>
            <p className={styles['cta-description']}>Join the Faridabad Police Department in modernizing accident reporting and case management.</p>
            <div className={styles['cta-buttons']}>
              <a href="/login" className={styles['btn'] + ' ' + styles['btn-solid'] + ' ' + styles['btn-large']}>Sign In Now</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home; 