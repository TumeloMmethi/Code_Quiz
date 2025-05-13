import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ScoreBoard from './components/ScoreBoard'
import Question from './components/Question'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ScoreBoard" element={<ScoreBoard />} />
        <Route path="/Question" element={<Question />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
