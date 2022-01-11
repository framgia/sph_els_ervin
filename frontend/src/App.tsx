import React from 'react';
import './App.css';
import { Navbar } from './layout/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from './actions';

import SplashPage from './pages/SplashPage';
import RegistrationPage from './pages/Auth/RegistrationPage';
import LoginPage from './pages/Auth/LoginPage';
import ListUsersPage from './pages/Users/ListUsersPage';

interface AppProps {
  SessionData: {
    user: User;
    token: string;
  };
}

function App(props: AppProps) {
  // Is changed to an AuthRoute component in the next PR
  const checkAuthStatus = () => {
    return props.SessionData.user === null;
  };

  const redirectToAuth = () => {
    return <Navigate to='/' replace={true} />;
  };

  const redirectToAuthIfNotLoggedIn = (component: JSX.Element): JSX.Element => {
    return checkAuthStatus() ? redirectToAuth() : component;
  };

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route
          path='/register'
          element={redirectToAuthIfNotLoggedIn(<RegistrationPage />)}
        />
        <Route
          path='/login'
          element={redirectToAuthIfNotLoggedIn(<LoginPage />)}
        />
        <Route
          path='/users'
          element={redirectToAuthIfNotLoggedIn(<ListUsersPage />)}
        />
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
