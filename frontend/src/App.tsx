import React from 'react';
import './App.css';
import { Navbar } from './layout/Navbar';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from './actions';

import SplashPage from './pages/SplashPage';
import RegistrationPage from './pages/Auth/RegistrationPage';
import LoginPage from './pages/Auth/LoginPage';
import ListUsersPage from './pages/Users';
import ProfilePage from './pages/Users/ProfilePage';
import EditProfilePage from './pages/Users/ProfilePage/edit';
import CategoriesPage from './pages/Categories';
import Quiz from './pages/Categories/Quiz';

interface AppProps {
  SessionData?: {
    user: User;
    token: string;
  };
}

function App(props: AppProps) {
  // Auth Navigation
  const userAuthenticationStatus = () => {
    return props.SessionData;
  };

  const AuthRoute = (): JSX.Element => {
    let location = useLocation();
    return !userAuthenticationStatus() ? (
      <Navigate to='/login' replace={true} state={{ from: location }} />
    ) : (
      <Outlet />
    );
  };

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />

        {/* Forces a redirect to the login page if unauthenticated */}
        <Route element={<AuthRoute />}>
          <Route path='/users'>
            <Route path=':userId'>
              <Route index element={<ProfilePage />} />
              <Route path='edit' element={<EditProfilePage />} />
            </Route>
            <Route index element={<ListUsersPage />} />
          </Route>
          <Route path='/categories'>
            <Route index element={<CategoriesPage />} />
            <Route path=':categorySlug'>
              <Route index element={<Quiz />} />
            </Route>
          </Route>
        </Route>
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
