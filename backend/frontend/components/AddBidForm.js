// app/frontend/components/AddBidForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddBidForm() {
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post('/api/bids', { user, amount });
      alert('Bid added successfully!');
      setUser('');
      setAmount('');
    } catch (error) {
      console.error('Error adding bid:', error);
      alert('Failed to add bid. Please try again.');
    }
  };

  return (
    <div className="add-bid-form">
      <h2>Add Bid</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">User:</label>
        <input type="text" id="user" value={user} onChange={e => setUser(e.target.value)} required />
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required />
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
}

export default AddBidForm;
