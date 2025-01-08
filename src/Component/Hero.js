import React, { useState } from 'react';
import SignIn from './Form/SignIn';
import SignUp from './Form/SignUp';

export default function Hero() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [ShowSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false); // Close SignIn if it's open
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false); // Close SignUp if it's open
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
          <button className="button" onClick={handleSignUpClick}>{ShowSignUp ? 'Close': 'Sign Up'}</button>
        </ul>
      </nav>
      {/* Render SignIn form conditionally */}
       {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
       {ShowSignUp && <SignUp setShowSignUp={setShowSignUp} />}
    </section>
  );
}
