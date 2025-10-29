// src/CatFacts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CatFacts = () => {
  const [fact, setFact] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCatFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://meowfacts.herokuapp.com/');
      setFact(response.data.data[0]);
    } catch (err) {
      setError('Failed to fetch cat fact.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Random Cat Fact</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <p>{fact}</p>}
      <button onClick={fetchCatFact}>Get Another Fact</button>
    </div>
  );
};

export default CatFacts;