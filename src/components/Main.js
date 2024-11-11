import React, { useState, useEffect } from 'react';
import './main.css';
import Image from '../images/home-image.jpg';

function Main() {
  const texts = [
    "Welcome to Our International Online Banking Platform",
    "Your trusted partner for seamless and secure financial transactions. With an intuitive design and advanced features, managing your finances has never been easier.",
    "Banking Without Borders – Global Access, Local Support - Whether you’re at home or traveling, enjoy uninterrupted access to your accounts and services. Our international network and local support teams ensure you can bank with confidence from anywhere in the world.",
    "Secure, Reliable, and Convenient Banking Solutions - Our commitment to top-tier security ensures your data stays protected. Enjoy the peace of mind that comes with banking services you can trust, accessible whenever and wherever you need them.",
    "Manage Your Finances Anytime, Anywhere - From monitoring your accounts to transferring funds and setting savings goals, our platform empowers you to stay in control of your finances on your terms, 24/7.",
    "Join Us Today and Experience Hassle-Free Banking - Sign up in minutes and gain access to a suite of powerful tools that simplify every aspect of your financial journey. Start your banking experience with us and see the difference!"
  ];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    const slideOutTimer = setTimeout(() => {
      setSlideIn(false); // Start slide-out animation
    }, 8000); // Start sliding out after 8 seconds

    const slideInTimer = setTimeout(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Move to the next text
      setSlideIn(true); // Start slide-in animation for the new text
    }, 10000); // Switch text after 10 seconds

    return () => {
      clearTimeout(slideOutTimer);
      clearTimeout(slideInTimer);
    };
  }, [currentTextIndex, texts.length]);

  return (
    <div className="main-container">
      <div className="background-image" />
      <div className={`sliding-text ${slideIn ? 'slide-in' : 'slide-out'}`}>
        <h1>{texts[currentTextIndex]}</h1>
      </div>
      <button className="get-started-button" onClick={() => window.location.href = '/signup'}>
        Get Started
      </button>
    </div>
  );
}

export default Main;
