import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { auth } = useAuth();
  const [stats, setStats] = useState({
    totalApplications: 0,
    upcomingInterviews: 0,
    rejectedApplications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/applications/stats', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      }
    };

    if (auth.token) {
      fetchStats();
    }
  }, [auth.token]);

  const quotes = [
    "Every rejection is a redirection.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The comeback is always stronger than the setback.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Applications</h3>
            <p>{stats.totalApplications}</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming Interviews</h3>
            <p>{stats.upcomingInterviews}</p>
          </div>
          <div className="stat-card">
            <h3>Rejected Applications</h3>
            <p>{stats.rejectedApplications}</p>
            <p className="quote"><em>"{randomQuote}"</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
