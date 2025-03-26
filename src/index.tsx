// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import global CSS for overall styling (fonts, background, etc.)
import './styles/global.css';

// Find the root element in the HTML and create a React root
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Render the App component inside React.StrictMode for extra checks in development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
