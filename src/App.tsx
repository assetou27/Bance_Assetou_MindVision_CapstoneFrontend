// src/App.tsx
// Import required modules and components
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import BookSession from './pages/BookSession';
import Home from './pages/HomePage';
import SessionList from './pages/SessionListPage';

// Wrapper component to protect routes that require authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // Check for token in localStorage to determine if user is logged in
  const isAuthenticated = !!localStorage.getItem('token');

  // If authenticated, render the child route; else redirect to login
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    // Wrap everything inside React Router
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />               {/* Login page */}
        <Route path="/register" element={<Register />} />    {/* Registration page */}
        <Route path="/home" element={<Home />} />            {/* Public homepage */}

        {/* Protected Routes (require login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <SessionList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}


<Route path="/home" element={<HomePage />} />
<Route path="/sessions" element={
  <ProtectedRoute>
    <SessionListPage />
  </ProtectedRoute>
} />


<Route path="/about" element={<AboutPage />} />
<Route path="/sessions" element={<ProtectedRoute><SessionListPage /></ProtectedRoute>} />
<Route path="/availability" element={<ProtectedRoute><SetAvailability /></ProtectedRoute>} />

export default App;
