import React from "react";
import "../styles/Dashboard.css"; // ✅ Import the CSS for this page

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Page Title */}
      <h1>Welcome to your Dashboard</h1>

      {/* Placeholder text for future features */}
      <p>
        This is where you'll see your sessions, messages, and tools once we finish building them.
      </p>
    </div>
  );
};

export default Dashboard;
