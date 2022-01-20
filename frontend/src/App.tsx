import React from 'react';
import './App.css';
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
import CategoriesTablePage from './pages/Admin/Categories';
import AddWordPage from './pages/Admin/AddWord/create';
import AddEditCategory from './pages/Admin/Categories/addedit';
import Navbar from './layout/Navbar';
import AdminUsersList from './pages/Admin/Users';
import API from './api/baseAPI';
import { useEffect } from 'react';
import CategoryAPI from './api/CategoryAPI';
import Cookies from 'js-cookie';

interface AppProps {
  SessionData?: {
    user: User;
    token: string;
  };
}

function App(props: AppProps) {
  useEffect(() => {
    Cookies.get('user_token') !== props.SessionData?.token &&
      window.location.reload();
  }, [props.SessionData?.token]);

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

  const userAdminStatus = () => {
    return props.SessionData && props.SessionData.user.is_admin;
  };

  const AdminRoute = (): JSX.Element => {
    let location = useLocation();
    return !userAdminStatus() ? (
      <Navigate to='/' replace={true} state={{ from: location }} />
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
        <Route path='/admin' element={<AdminRoute />}>
          <Route path='categories'>
            <Route index element={<CategoriesTablePage />} />
            <Route path='new' element={<AddEditCategory />} />
            <Route path='edit/:categorySlug' element={<AddEditCategory />} />
            <Route path=':categorySlug' element={<AddWordPage />} />
          </Route>
          <Route path='users'>
            <Route index element={<AdminUsersList />} />
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
