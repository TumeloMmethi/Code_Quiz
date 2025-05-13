// src/components/Question.js
import React from 'react';

const Question = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  timer,
  selectedAnswer,
  submitted,
  handleOptionSelect,
  handleSubmit,
  handlePrevious,
  handleNext,
  handleFinish,
  getOptionClass,
  getTick,
  canGoNext,
}) => {
  return (
    <div className="quiz-container">
      <h1>Question {currentQuestionIndex + 1} of {totalQuestions}</h1>

      <div className="timer">⏱️ Time Left: {timer}s</div>

      <div className="question-container">
        <h3>{currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !submitted && handleOptionSelect(opt)}
              className={getOptionClass(opt)}
            >
              {opt}
              <span>{getTick(opt)}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} disabled={submitted || selectedAnswer === null}>
        Submit Answer
      </button>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button onClick={handleNext} disabled={!submitted}>
            Next
          </button>
        ) : (
          submitted && (
            <button className="finish-button" onClick={handleFinish}>
              Finish Quiz
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Question;
