// src/pages/Dashboard.jsx
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../styles/global.css';
import '../styles/layout.css';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <h2>Welcome to Your Dashboard</h2>
          <p>This is your personalized dashboard. Here you can manage your tasks and view reports.</p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
