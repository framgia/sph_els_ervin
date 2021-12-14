import React from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route path='/register' element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}

export default App;
