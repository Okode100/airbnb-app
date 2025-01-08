import React from "react";
import './SignIn.css';

export default function SignUp({ setShowSignUp }) {
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form submitted"); // Log details or handle form submission logic
    setShowSignUp(false); // Close the SignUp form
  };

  return (
    <div className="signin-modal">
      <div className="signin-wrapper">
        <form onSubmit={handleFormSubmit}>
          <h1>Sign Up</h1>
          <div className="input-box">
            <label>Username:</label>
            <input type="email" placeholder="user_mail" required />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="password" minLength="8" required />
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
