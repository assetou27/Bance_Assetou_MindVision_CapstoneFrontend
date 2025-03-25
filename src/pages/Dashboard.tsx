// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import mockApi from "../api/mockApi"; // Use the mock API
import "../styles/Dashboard.css";

// ...rest of your component

useEffect(() => {
  console.log("Dashboard mounting - checking auth...");
  
  // Get stored auth data
  const storedRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  
  if (!storedRole || !userId) {
    console.error("Missing authentication data");
    setError("Authentication failed. Please log in again.");
    return;
  }
  
  setRole(storedRole);
  
  // Fetch sessions data using mock API
  const fetchSessions = async () => {
    try {
      // Choose endpoint based on user role
      const sessions = storedRole === "coach" 
        ? await mockApi.getCoachSessions(userId)
        : await mockApi.getClientSessions(userId);
      
      console.log("Sessions data received:", sessions);
      setSessions(sessions || []);
    } catch (err: any) {
      console.error("Error fetching sessions:", err);
      setError(`Failed to load sessions: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  fetchSessions();
}, []);

// ...rest of the component