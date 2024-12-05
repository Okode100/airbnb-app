import React from "react";
import './SignIn.css';

export default function SignIn({ setShowSignIn }) {
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form submitted"); // Log details or handle form submission logic
    setShowSignIn(false); // Hide the form
  };

  return (
    <div className="signin-modal">
      <div className="signin-wrapper">
        <form onSubmit={handleFormSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
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
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
