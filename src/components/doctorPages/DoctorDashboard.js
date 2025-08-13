import React from 'react';

function Dashboard ({ children }) {
  return (
    <header className="dashboard">
        <h1>Doctor Dashboard</h1>
        <p>Welcome to your doctor dashboard!</p>
        {children}
    </header>
  );
}
export default Dashboard;