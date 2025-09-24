import React from 'react';
import '../styles/home.css'; // We'll create this CSS file next

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Job Tracker!</h1>
        <p>Your personal assistant for managing job applications.</p>
        <p>Login or Register to get started.</p>
      </div>
    </div>
  );
};

export default Home;
