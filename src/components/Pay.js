import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './pay.css';

function Pay() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [provider, setProvider] = useState('');
  const [accName, setAccName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1); // Track the current form step
  const token = Cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === 1) {
        // Move to the second form step
        setStep(2);
      } else {
        // Submit all data to the backend
        const response = await fetch('/paymentDetails/payDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount,
            currency,
            provider,
            accName,
            accNumber,
            swiftCode,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSuccessMessage('Details successfully saved!');
        setAmount('');
        setCurrency('');
        setProvider('');
        setAccName('');
        setAccNumber('');
        setSwiftCode('');

        setTimeout(() => {
          setSuccessMessage('');
          window.alert('Your transaction was successfully');
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while saving payment details.');
    }
  };

  return (
    <div className='payment-details'>
      <div className='payment-details-form'>
        <form onSubmit={handleSubmit}>
          <h1>Payment Details</h1>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {step === 1 && (
            <>
              <div className='payment-details-form-input-box'>
                <input
                  type='number'
                  placeholder='Enter the amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className='payment-details-form-input-box'>
                <select
                  id='currency'
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  required
                >
                  <option value="">Select Currency</option>
                  <option value="ZAR">Rand (ZAR)</option>
                  <option value="USD">Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">Pound Sterling (GBP)</option>
                  <option value="ZWL">Zimbabwean Dollar (ZWL)</option>
                </select>  
              </div>

              <div className='payment-details-form-input-box'>
                <select
                  id='provider'
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  required
                >
                  <option value="">Select Service Provider</option>
                  <option value="SWIFT">SWIFT</option>
                  <option value="Wise">Wise</option>
                  <option value="SEPA">SEPA</option>
                </select>  
              </div>

              <button type='submit' className='payment-details-form-submit-button'>
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className='payment-details-form-input-box'>
                <input
                  type='text'
                  placeholder='Account Name'
                  value={accName}
                  onChange={(e) => setAccName(e.target.value)}
                  required
                />
              </div>

              <div className='payment-details-form-input-box'>
                <input
                  type='text'
                  placeholder='Account Number'
                  value={accNumber}
                  onChange={(e) => setAccNumber(e.target.value)}
                  required
                />
              </div>

              <div className='payment-details-form-input-box'>
                <input
                  type='text'
                  placeholder='SWIFT Code'
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value)}
                  required
                />
              </div>

              <button type='submit' className='payment-details-form-submit-button'>
                Pay Now
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default Pay;
