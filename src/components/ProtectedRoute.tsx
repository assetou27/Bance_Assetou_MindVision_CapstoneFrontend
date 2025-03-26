// src/components/ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

// Define props to accept a single child component
interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(UserContext);

  // If there is no authenticated user, redirect to the Login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the child component
  return children;
}
