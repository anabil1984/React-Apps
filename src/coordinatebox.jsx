import React from 'react';

const CoordinateBox = ({ coordinates }) => {
  return (
    <div className="coordinate-box">
      <h3>Coordinates:</h3>
      <p>{coordinates[0]}, {coordinates[1]}</p>
    </div>
  );
};

export default CoordinateBox;