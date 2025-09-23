import React from 'react';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <p>Welcome to your job application tracker.</p>
        <p>You can manage your job applications from the "Applications" page.</p>
      </div>
    </div>
  );
};

export default Dashboard;
