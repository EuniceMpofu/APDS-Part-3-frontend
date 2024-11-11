import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function EmployeeLogin() {
    const [fullname, setFullname] = useState('');
    const [accNumber, setAccNumber] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
      
        const response = await fetch('/user/employee-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname,
            accNumber,
            password,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setSuccessMessage('User signed in successfully!');
        setFullname('');
        setAccNumber('');
        setPassword('');
  
        setTimeout(() => {
          setSuccessMessage('');
          
        }, 3000);
  
        window.location.href = '/employee-portal';
      } catch (error) {
        console.error('Error signing in:', error);
        setErrorMessage('An error occurred while signing in.');
      }
    };

  return (
    <div className='sign-in'>
      <div className='sign-in-form'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className='sign-in-form-input-box'>
            <input
              type='text'
              placeholder='Enter your fullname'
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className='sign-in-form-input-box'>
            <input
              type='text'
              placeholder='Enter your account Number'
              value={accNumber}
              onChange={(e) => setAccNumber(e.target.value)}
              required
            />
          </div>
          <div className='sign-in-form-input-box'>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="sign-in-form-submit-button">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default EmployeeLogin