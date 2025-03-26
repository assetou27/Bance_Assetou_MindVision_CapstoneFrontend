import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';

/**
 * Application entry point
 * Renders the main App component to the DOM
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);