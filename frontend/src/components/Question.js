// === src/components/Question.js ===
import React from 'react';

// The Question component displays the current question to the user
const Question = ({ text }) => {
  return (
    <div className="question">
      <h2>{text}</h2> {/* Render the question text */}
    </div>
  );
};

export default Question;