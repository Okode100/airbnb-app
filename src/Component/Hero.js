import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Hero.css'; // Import the CSS file for styling
import SignIn from './Form/SignIn'; // Import SignIn component
import SignUp from './Form/SignUp'; // Import SignUp component

export default function Hero() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showSignIn, setShowSignIn] = useState(false); // State for Sign In form visibility
  const [showSignUp, setShowSignUp] = useState(false); // State for Sign Up form visibility

  const handleProfileClick = () => {
    navigate('/user-profile'); // Redirect to user profile
  };

  return (
    <div className="hero-container">
      <h1>Welcome to Our Service</h1>
      <button onClick={handleProfileClick}>Go to Profile</button> {/* Clickable profile button */}
      <button onClick={() => setShowSignIn(true)}>Sign In</button> {/* Show Sign In form */}
      <button onClick={() => setShowSignUp(true)}>Sign Up</button> {/* Show Sign Up form */}

      {showSignIn && <SignIn setShowSignIn={setShowSignIn} />} {/* Render Sign In form */}
      {showSignUp && <SignUp setShowSignUp={setShowSignUp} />} {/* Render Sign Up form */}
    </div>
  );
}
