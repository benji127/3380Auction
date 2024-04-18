// app/frontend/components/BidsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BidsPage() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const response = await axios.get('/api/bids');
      setBids(response.data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  return (
    <div className="bids-page">
      <h2>All Bids</h2>
      <ul>
        {bids.map(bid => (
          <li key={bid._id}>
            <strong>{bid.user}:</strong> ${bid.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BidsPage;
