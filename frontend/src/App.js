
// import React, { useState, useEffect } from 'react';
// import Question from './components/Question';
// import Options from './components/Options';
// import './styles/Game.css';

// function App() {
//   const [selectedTopic, setSelectedTopic] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const handleTopicClick = (topic) => {
//     setSelectedTopic(topic);
//     setLoading(true);
//     fetch(`http://localhost:8000/questions.php?topic=${topic}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setQuestions(data);
//         setCurrentIndex(0);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching questions:', err);
//         setLoading(false);
//       });
//   };

//   const handleBackToTopics = () => {
//     setSelectedTopic('');
//     setQuestions([]);
//     setCurrentIndex(0);
//   };

//   const handleNext = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   if (!selectedTopic) {
//     return (
//       <div style={{ textAlign: 'center', paddingTop: '50px' }}>
//         <h2>🎯 Choose a Quiz Topic</h2>
//         <button onClick={() => handleTopicClick('html')}>HTML</button>
//         <button onClick={() => handleTopicClick('javascript')}>JavaScript</button>
//         <button onClick={() => handleTopicClick('react')}>React</button>
//         <button onClick={() => handleTopicClick('php')}>PHP</button>
//       </div>
//     );
//   }

//   if (loading) return <p style={{ textAlign: 'center' }}>Loading {selectedTopic} questions...</p>;

//   const currentQuestion = questions[currentIndex];

//   return (
//     <div style={{ textAlign: 'center', paddingTop: '30px' }}>
//       <h1>{selectedTopic.toUpperCase()} Quiz</h1>
//       <Question text={currentQuestion.question} />
//       <Options options={currentQuestion.options} onSelect={() => {}} />

//       <div style={{ marginTop: '20px' }}>
//         <button onClick={handlePrevious} disabled={currentIndex === 0}>
//           ⬅️ Previous
//         </button>
//         <button onClick={handleNext} disabled={currentIndex === questions.length - 1} style={{ marginLeft: '10px' }}>
//           Next ➡️
//         </button>
//       </div>

//       <button onClick={handleBackToTopics} style={{ marginTop: '30px', display: 'block', marginInline: 'auto' }}>
//         🔙 Back to Topics
//       </button>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import './styles/Game.css';
import Fireworks from './components/Fireworks';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setCurrentQuestionIndex(0);
    fetch(`http://localhost:8000/questions.php?topic=${topic}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
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
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBackToTopics = () => {
    setSelectedTopic('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="app-wrapper">
      <Fireworks />

      {!selectedTopic ? (
        <div className="main-content">
          <h1 className="logo-title">Code Quiz</h1>
          <div className="topic-container">
            <h2>🎯 Choose a Quiz Topic</h2>
            <button onClick={() => handleTopicClick('html')}>HTML</button>
            <button onClick={() => handleTopicClick('javascript')}>JavaScript</button>
            <button onClick={() => handleTopicClick('react')}>React</button>
            <button onClick={() => handleTopicClick('php')}>PHP</button>
          </div>
        </div>
      ) : loading ? (
        <p className="loading">Loading {selectedTopic} questions...</p>
      ) : questions.length === 0 ? (
        <p>No questions found for this topic.</p>
      ) : (
        <div className="quiz-container">
          <h1>{selectedTopic.toUpperCase()} Quiz</h1>
          <div className="question-container">
            <h3>{currentQuestion.question}</h3>
            <div className="options">
              {currentQuestion.options.map((opt, i) => (
                <button key={i}>{opt}</button>
              ))}
            </div>
          </div>

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

          <button className="back-to-topics" onClick={handleBackToTopics}>
            Back to Topics
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
