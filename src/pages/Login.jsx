import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css';
import loginImage from '../assets/healthcare.jpg';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <img src={loginImage} alt="Login Visual" className="auth-image" />
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Login</h2>
          <form className="auth-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <p>
              Don’t have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
