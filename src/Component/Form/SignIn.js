import React from "react";
import './SignIn.css';

export default function SignIn({ setShowSignIn }) {
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form submitted"); // Log details or handle form submission logic
    setShowSignIn(false); // Close the SignIn form
  };

  return (
    <div className="signin-modal">
      <div className="signin-wrapper">
        <form onSubmit={handleFormSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" placeholder="User_mail" required />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
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
