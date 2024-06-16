import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ContactPage from './Pages/ContactPage'; // Import the ContactPage component
import Footer from './components/Footer'; // Import the Footer component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* Add route for ContactPage */}
          {/* Add other routes as needed */}
        </Routes>
        <Footer /> {/* Include the Footer component */}
      </div>
    </Router>
  );
};

export default App;
