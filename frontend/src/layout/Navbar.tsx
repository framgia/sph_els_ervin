import { Component, Fragment, useEffect } from 'react';
import '../index.css';
import { connect, useSelector } from 'react-redux';
import { User, SessionData } from '../actions/types';
import { logoutUser } from '../actions/auth';
import { Link, Navigate } from 'react-router-dom';

interface Props {
  currentLogin: SessionData;
  logoutUser: Function;
  loading: boolean;
}

const Navbar = ({ currentLogin, logoutUser, loading }: Props) => {
  useEffect(() => {
    console.log(currentLogin);
  }, [currentLogin]);

  const logoutSession = (): void => {
    if (currentLogin) {
      logoutUser({
        user_id: currentLogin.user.id,
        token: currentLogin.token,
      });
      <Navigate to='/' replace={true} />;
    }
  };

  const showLoginStatus = () => {
    return (
      <div className='mr-2'>
        {currentLogin ? (
          <div>
            <Link
              to={`/users/${currentLogin.user.id}`}
              className='text-lg font-bold mr-4'
            >{`Hello, ${currentLogin.user.name}!`}</Link>
            <button
              className='btn btn-sm btn-info mr-5'
              onClick={logoutSession}
            >
              {loading ? (
                <span className='flex items-center justify-center'>
                  <span className='w-4 h-4 border-b-2 border-white-900 rounded-full animate-spin mr-5'></span>
                  Logout
                </span>
              ) : (
                'Logout'
              )}
            </button>
          </div>
        ) : (
          <div>
            <Link to='/login' className='btn btn-sm btn-info mr-5'>
              Login
            </Link>
            <Link to='/register' className='btn btn-sm btn-success mr-3'>
              Register
            </Link>
          </div>
        )}
      </div>
    );
  };

  const renderNavbarCategories = () => {
    return (
      <>
        <Link to='/users' className='btn btn-ghost btn-sm rounded-btn'>
          Users
        </Link>
        <Link to='/categories' className='btn btn-ghost btn-sm rounded-btn'>
          Categories
        </Link>
        {currentLogin.user.is_admin && (
          <div className='dropdown'>
            <div tabIndex={0} className='m-1 btn'>
              Admin
            </div>
            <ul
              tabIndex={0}
              className='p-4 shadow menu dropdown-content bg-base-100 rounded-box w-52'
            >
              <li>
                <Link
                  to='/admin/categories'
                  className='btn btn-ghost btn-sm rounded-btn p-2'
                >
                  Category List
                </Link>
              </li>
              <li>
                <Link
                  to='/admin/users'
                  className='btn btn-ghost btn-sm rounded-btn p-2'
                >
                  Users List
                </Link>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box'>
        <div className='flex-1 px-2 mx-2'>
          <span className='text-lg font-bold'>
            <Link to='/'>ELS</Link>
          </span>
          <div className='flex-1 px-2 mx-2'>
            <div className='items-stretch hidden lg:flex'>
              <div>
                <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
                  Home
                </Link>
                {currentLogin && renderNavbarCategories()}
              </div>
            </div>
          </div>
        </div>
        <div className='flex-none'>{showLoginStatus()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
    loading: state.logout.loading,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
