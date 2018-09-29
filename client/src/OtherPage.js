import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
  return (
    <div>
      <h2>Go back</h2>
      <Link to="/">Home</Link>
    </div>
  );
};

export default OtherPage;
