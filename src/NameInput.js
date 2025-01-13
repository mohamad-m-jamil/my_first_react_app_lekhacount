import React, { useState } from 'react';

function NameInput({ onNamesSubmit }) {
  // State to hold the four names
  const [names, setNames] = useState(['', '', '', '']);

  // Handle input changes
  const handleNameChange = (e, index) => {
    const newNames = [...names];
    newNames[index] = e.target.value;
    setNames(newNames);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (names.every(name => name.trim() !== '')) {
      onNamesSubmit(names);
    } else {
      alert("Please enter all four names.");
    }
  };

  return (
    <div>
      <h1>Enter Player Names</h1>
      <form onSubmit={handleSubmit}>
        {names.map((name, index) => (
          <div key={index}>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e, index)}
              placeholder={`Player ${index + 1}`}
            />
          </div>
        ))}
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default NameInput;
