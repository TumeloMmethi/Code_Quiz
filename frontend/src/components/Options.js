// components/Options.js
import React from 'react';

const Options = ({ options, onSelect }) => {
  return (
    <div className="options" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
      {options.map((opt, index) => (
        <button key={index} className="option-button" onClick={() => onSelect(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Options;
