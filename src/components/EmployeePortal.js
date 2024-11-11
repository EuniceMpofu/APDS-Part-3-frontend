import React, { useState, useEffect } from 'react';
import './employeePortal.css';

function EmployeePortal() {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/paymentDetails/')
      .then(response => response.json())
      .then(data => setPaymentDetails(data))
      .catch(error => console.error('Error fetching transaction details:', error));
  }, []);

  const handleSubmit = async (_id, action) => {
    const updatePayload = action === 'verify' ? { verified: true } : { submitted: true };

    try {
      const response = await fetch(`/paymentDetails/payDetails/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage(`Transaction ${action}ed successfully`);

      // Update transaction details
      setPaymentDetails(prevDetails =>
        prevDetails.map(payment =>
          payment._id === _id ? { ...payment, ...updatePayload } : payment
        )
      );

      setPaymentDetails(paymentDetails => paymentDetails.filter(payment => payment._id !== _id));

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error during transaction update:', error);
      setErrorMessage(`Failed to ${action} the transaction.`);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className='employee-portal'>
      <h1>Employee Portal</h1>
      <h2>Payment Details</h2>
      <table className='transaction-details'>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Service Provider</th>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Swift Code</th>
            <th>Verify</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails.length > 0 ? (
            paymentDetails.map(p => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.amount}</td>
                <td>{p.currency}</td>
                <td>{p.provider}</td>
                <td>{p.accName}</td>
                <td>{p.accNumber}</td>
                <td>{p.swiftCode}</td>
                <td>
                  <button 
                    className='verify-button'
                    onClick={() => handleSubmit(p._id, 'verify')}
                    disabled={p.verified} // Disable if already verified
                  >
                    {p.verified ? 'Verified' : 'Verify'}
                  </button>
                </td>
                <td>
                  <button 
                    className='submit-button'
                    onClick={() => handleSubmit(p._id, 'submit')}
                    disabled={p.submitted} // Disable if already submitted
                  >
                    {p.submitted ? 'Submitted' : 'Submit'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='9'>No transaction details found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {successMessage && <div className='success-message'>{successMessage}</div>}
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
    </div>
  );
}

export default EmployeePortal;
