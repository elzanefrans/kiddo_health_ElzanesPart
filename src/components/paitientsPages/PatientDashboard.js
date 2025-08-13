import React from 'react';

function Dashboard ({ children }) {
  return (
    <header className="dashboard">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {children}
        </header>
  );
}

export default Dashboard;