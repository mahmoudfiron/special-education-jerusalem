import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage'; // Import the LoginPage component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<HomePage scrollToContact={true} />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add routes for other pages here... */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
