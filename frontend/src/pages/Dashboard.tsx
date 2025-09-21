import React from 'react';

interface DashboardProps {
  token: string;
  logout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ token, logout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
