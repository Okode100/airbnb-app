import React from "react";
import './SignIn.css';
import { useNavigate } from 'react-router-dom'; // Update to useNavigate
import axios from 'axios';

export default function SignIn({ setShowSignIn }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const email = e.target.email.value; // Get email from input
    const password = e.target.password.value; // Get password from input

    // Simulate login API call
    axios.post('http://localhost:3000/login', { email, password })
      .then(response => {
        console.log("Login successful", response.data);
        setShowSignIn(false); // Close the SignIn form
        navigate('/user-profile'); // Redirect to user profile
      })
      .catch(error => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <div className="signin-modal">
      <div className="signin-wrapper">
        <form onSubmit={handleFormSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" name="email" placeholder="User_mail" required />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="Password" required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="password.js">Forgot password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <button type="button" onClick={() => setShowSignIn(false)}>Sign Up</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
