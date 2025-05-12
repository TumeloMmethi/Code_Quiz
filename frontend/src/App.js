import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/Game.css';
import Fireworks from './components/Fireworks';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(15); // Timer in seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundVisible(false);
      setShowContent(true);
    }, 1000); // Delay before the fireworks fade out
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!submitted && selectedTopic && selectedDifficulty && questions.length > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setSubmitted(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, submitted, questions]);

  useEffect(() => {
    if (!submitted) {
      setTimer(15); // Reset timer on new question or after navigation
    }
  }, [currentQuestionIndex, submitted]);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setSelectedDifficulty('');
  };

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setLoading(true);
    setCurrentQuestionIndex(0);

    fetch(`http://localhost/questions.php?topic=${selectedTopic}&difficulty=${difficulty}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data);
        } else {
          setQuestions([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching questions:', err);
        setLoading(false);
      });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    }
  };

  const handleBackToTopics = () => {
    setSelectedTopic('');
    setSelectedDifficulty('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const getOptionClass = (option) => {
    if (!submitted) {
      return selectedAnswer === option ? 'selected' : '';
    }

    if (submitted) {
      if (option === currentQuestion.answer) {
        return 'correct';
      } else if (option === selectedAnswer && option !== currentQuestion.answer) {
        return 'wrong';
      }
    }

    return '';
  };

  const getTick = (option) => {
    if (submitted && option === currentQuestion.answer) {
      return ' ✅';
    }
    return '';
  };

  return (
    <div className="app-wrapper">
      <Fireworks />

      {backgroundVisible && <div className="slide-black-bg" />}

      {!selectedTopic ? (
        <div className="main-content">
          {showContent && (
            <>
              <h1 className="logo-title pop-up delay-1">Code Quiz</h1>
              <div className="topic-container">
                <h2 className="pop-up delay-2">🎯 Choose a Quiz Topic</h2>
                <div className="topic-buttons">
                  <button onClick={() => handleTopicClick('html')}>HTML</button>
                  <button onClick={() => handleTopicClick('css')}>CSS</button>
                  <button onClick={() => handleTopicClick('javascript')}>JavaScript</button>
                  <button onClick={() => handleTopicClick('react')}>React</button>
                  <button onClick={() => handleTopicClick('php')}>PHP</button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : !selectedDifficulty ? (
        <div className="main-content">
          <h2>📈 Choose Difficulty Level for {selectedTopic.toUpperCase()}</h2>
          <div className="topic-buttons">
            <button onClick={() => handleDifficultyClick('easy')}>Easy</button>
            <button onClick={() => handleDifficultyClick('medium')}>Medium</button>
            <button onClick={() => handleDifficultyClick('hard')}>Hard</button>
          </div>
          <button className="back-to-topics" onClick={handleBackToTopics}>
            Back to Topics
          </button>
        </div>
      ) : loading ? (
        <p className="loading">Loading {selectedTopic} ({selectedDifficulty}) questions...</p>
      ) : questions.length === 0 ? (
        <p>No questions found for this topic and difficulty.</p>
      ) : (
        <div className="quiz-container">
          <h1>{selectedTopic.toUpperCase()} Quiz ({selectedDifficulty.toUpperCase()})</h1>

          <div className="timer">⏱️ Time Left: {timer}s</div>

          <div className="question-container">
            <h3>{currentQuestion.question}</h3>
            <div className="options">
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => !submitted && setSelectedAnswer(opt)}
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
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
          </div>

          <div className="navigation-buttons">
            <button
              className="back-to-difficulty"
              onClick={() => {
                setSelectedDifficulty('');
                setQuestions([]);
                setCurrentQuestionIndex(0);
              }}
            >
              Choose Difficulty Level
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
