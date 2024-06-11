import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import AddContent from './components/ContentManagement/AddContent';
import EditContent from './components/ContentManagement/EditContent';
import Comments from './components/Interaction/Comments';
import Likes from './components/Interaction/Likes';
import Ratings from './components/Interaction/Ratings';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Special Education Jerusalem</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-content" element={<AddContent />} />
          <Route path="/edit-content/:id" element={<EditContent />} />
          <Route path="/comments/:id" element={<Comments />} />
          <Route path="/likes/:id" element={<Likes />} />
          <Route path="/ratings/:id" element={<Ratings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
