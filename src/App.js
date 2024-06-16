import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add routes for other pages here... */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
