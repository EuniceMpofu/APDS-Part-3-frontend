import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './signUp.css';

function SignUp() {
  const [fullname, setFullname] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
    
      // Validate password
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}$/;
      if (!passwordPattern.test(password)) {
          setErrorMessage('Password must be at least 14 characters long and include a combination of upper and lowercase letters, numbers, and special characters.');
          return;
      }

      // Reset error message
      setErrorMessage('');

      const response = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          idNumber,
          accNumber,
          password,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage('User account created successfully!');
      setFullname('');
      setIdNumber('');
      setAccNumber('');
      setPassword('');

      setTimeout(() => {
        setSuccessMessage('');
        
      }, 3000);

      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('An error occurred while signing up.');
    }
  };

  return (
    <div className='sign-up'>
      <div className='sign-up-form'>
        <form onSubmit={handleSubmit}>
          <h1>Sign-Up</h1>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className='sign-up-form-input-box'>
            <input
              type='text'
              placeholder='Enter your fullname'
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className='sign-up-form-input-box'>
            <input
              type='text'
              placeholder='Enter your ID Number'
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />
          </div>
          <div className='sign-up-form-input-box'>
            <input
              type='text'
              placeholder='Enter your account Number'
              value={accNumber}
              onChange={(e) => setAccNumber(e.target.value)}
              required
            />
          </div>
          <div className='sign-up-form-input-box'>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="sign-in-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>

          <button type="submit" className="sign-up-form-submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp