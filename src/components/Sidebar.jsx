// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import '../styles/layout.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <Logo />
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              🏠 Dashboard
            </Link>
          </li>
          <li>
            <Link to="#">📊 Reports</Link>
          </li>
          <li>
            <Link to="#">👤 Profile</Link>
          </li>
          <li>
            <Link to="/">🚪 Logout</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
