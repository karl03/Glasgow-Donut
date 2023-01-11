import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from "./pages"
import AdminPage from './pages/AdminPage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} exact/>
        <Route path="/admin" element={<AdminPage/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;
