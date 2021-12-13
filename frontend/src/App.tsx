import React from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<SplashPage />} />
      </Routes>
    </div>
  );
}

export default App;
