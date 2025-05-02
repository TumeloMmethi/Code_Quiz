import React from 'react';

// Displays final score and option to restart the quiz
const ScoreBoard = ({ score, total, onRestart }) => {
  return (
    <div className="score-board">
      <h2>Quiz Complete!</h2>
      <div className="score">Your Score: {score} / {total}</div> 
      <button className="restart-button" onClick={onRestart}>
        Try Again
      </button>
    </div>
  );
};

export default ScoreBoard;