import React from "react";
import './SignIn.css';
import { useNavigate } from 'react-router-dom'; // Update to useNavigate
import axios from 'axios';

export default function SignUp({ setShowSignUp }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = e.target.email.value; // Get email from input
    const password = e.target.password.value; // Get password from input

    // Simulate registration API call
    axios.post('http://localhost:3000/register', { email, password })
      .then(response => {
        console.log("Registration successful", response.data);
        setShowSignUp(false); // Close the SignUp form
        navigate('/user-profile'); // Redirect to user profile
      })
      .catch(error => {
        console.error("There was an error registering!", error);
      });
  };

  return (
    <div className="signin-modal">
      <div className="signin-wrapper">
        <form onSubmit={handleFormSubmit}>
          <h1>Sign Up</h1>
          <div className="input-box">
            <label>Username:</label>
            <input type="email" name="email" placeholder="user_mail" required />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" placeholder="password" minLength="8" required />
          </div>
          <button type="submit" className="btn">Sign Up</button>
          <div className="input-box">
            <label>
              Already have an account? 
              <button type="button" onClick={() => setShowSignUp(false)}>Sign In</button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
