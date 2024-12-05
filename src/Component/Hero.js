import React, { useState } from 'react';
import SignIn from './Form/SignIn'; // Adjust path based on your folder structure

export default function Hero() {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn((prev) => !prev);
  };

  return (
    <section className="section1">
      <nav className="navbar">
        <div className="logo">
          <img src="/logo192.png" alt="logo" />
        </div>
        <ul>
          <li>About</li>
          <li>Technology</li>
          <li>Contact Us</li>
          <button className="button" onClick={handleSignInClick}>
            {showSignIn ? 'Close' : 'Sign In'}
          </button>
          <button className="button">Sign Up</button>
        </ul>
      </nav>
      {/* Render SignIn form conditionally */}
      {showSignIn && <SignIn />}
    </section>
  );
}
