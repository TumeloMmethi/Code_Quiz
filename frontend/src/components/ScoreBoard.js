import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const ScoreBoard = ({ score, total, onRestart }) => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    // Navigate back to the quiz and reset state there
    navigate('/Question'); // <-- Make sure this route renders your quiz
  };

  const handleBackToTopic = () => {
    navigate('/');
  };

  useEffect(() => {
    if (score >= 5) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [score]);

  // Conditional celebration or disappointment
  const renderFeedback = () => {
    if (score >= 5) {
      return (
        <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
          🎆🎉 Congratulations! 🎉🎆
        </div>
      );
    } else {
      return (
        <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
          😞😢 Better luck next time! 😢😞
        </div>
      );
    }
  };

  return (
    <div className="score-board" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Quiz Complete!</h2>
      <div className="score">Your Score: {score} / {total}</div>

      {renderFeedback()}

      <button className="restart-button" onClick={handleTryAgain}>
        Try Again
      </button>

      <button className="back-button" onClick={handleBackToTopic} style={{ marginTop: '10px' }}>
        Back to Topic
      </button>
    </div>
  );
};

export default ScoreBoard;
