import React, { useRef, useState } from 'react';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../styles/components/Reports.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

const caseTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Cases',
      data: [120, 150, 180, 130, 170, 200, 220, 210],
      backgroundColor: '#3182ce',
      borderRadius: 8,
    },
  ],
};

const statusBreakdownData = {
  labels: ['Open', 'Closed', 'Pending Review'],
  datasets: [
    {
      data: [87, 1158, 23],
      backgroundColor: ['#fb923c', '#059669', '#6366f1'],
      borderWidth: 0,
    },
  ],
};

const areaDistributionData = {
  labels: ['Delhi', 'Gurugram', 'Noida', 'Jaipur', 'Ghaziabad'],
  datasets: [
    {
      data: [320, 210, 180, 90, 60],
      backgroundColor: ['#3182ce', '#fb923c', '#059669', '#6366f1', '#facc15'],
      borderWidth: 0,
    },
  ],
};

const responseTimeData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Avg Response Time (min)',
      data: [18, 16, 15, 14, 13, 15, 14, 12],
      fill: false,
      borderColor: '#fb923c',
      backgroundColor: '#fb923c',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#3182ce',
    },
  ],
};

const Reports: React.FC = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [exported, setExported] = useState(false);

  const handleExport = async (type: 'image' | 'pdf') => {
    if (!dashboardRef.current) return;
    const canvas = await html2canvas(dashboardRef.current);
    if (type === 'image') {
      const link = document.createElement('a');
      link.download = 'dashboard.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('dashboard.pdf');
    }
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className={styles['reports-container']}>
      <div className={styles['reports-card']}>
        <div className={styles['reports-header']}>Reporting & Analytics Dashboard</div>
        <div className={styles['reports-actions']}>
          <button className={styles['reports-export']} onClick={() => handleExport('image')}><FaDownload style={{marginRight: 6}} />Export as Image</button>
          <button className={styles['reports-export']} onClick={() => handleExport('pdf')}><FaDownload style={{marginRight: 6}} />Export as PDF</button>
        </div>
        {exported && <div className={styles['reports-success']}>Dashboard exported successfully!</div>}
        <div ref={dashboardRef} className={styles['dashboard-grid']}>
          <div className={styles['dashboard-card']}>
            <div className={styles['card-title']}>Case Trends (Monthly)</div>
            <Bar data={caseTrendsData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: '#eee' } } } }} />
          </div>
          <div className={styles['dashboard-card']}>
            <div className={styles['card-title']}>Status Breakdown</div>
            <Pie data={statusBreakdownData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
          <div className={styles['dashboard-card']}>
            <div className={styles['card-title']}>Area Distribution</div>
            <Doughnut data={areaDistributionData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
          <div className={styles['dashboard-card']}>
            <div className={styles['card-title']}>Avg Response Time (Monthly)</div>
            <Line data={responseTimeData} options={{ responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, grid: { color: '#eee' } }, x: { grid: { display: false } } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 