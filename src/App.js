import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import TutorialsPage from './Pages/TutorialsPage';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import LinguisticEducationPage from './Pages/LinguisticEducationPage';
import Layout from './components/Layout'; // Import the Layout component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/linguistic-education" element={<LinguisticEducationPage />} />
            {/* Add other routes similarly */}
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
