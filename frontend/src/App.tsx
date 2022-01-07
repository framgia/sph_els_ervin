import React from 'react';
import './App.css';
import { Navbar } from './layout/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { connect } from 'react-redux';
import { User } from './actions';

interface AppProps {
  SessionData: {
    user: User;
    token: string;
  };
}

function App(props: AppProps) {
  // Rename this to something better
  const redirectIfNotLoggedIn = (component: JSX.Element): JSX.Element => {
    return props.SessionData.user ? (
      <Navigate to='/' replace={true} />
    ) : (
      component
    );
  };

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route
          path='/register'
          element={redirectIfNotLoggedIn(<RegistrationPage />)}
        />
        <Route path='/login' element={redirectIfNotLoggedIn(<LoginPage />)} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    SessionData: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps)(App);
