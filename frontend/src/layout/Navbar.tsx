import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { User } from '../actions/types';
import { logoutUser } from '../actions/user';
import { Link } from 'react-router-dom';
interface Props {
  SessionData: {
    user?: User;
    token?: string;
  };
  logoutUser: Function;
  loading: boolean;
}

class _Navbar extends Component<Props> {
  logoutSession = (): void => {
    if (this.props.SessionData.user) {
      this.props.logoutUser({
        user_id: this.props.SessionData.user.id,
        token: this.props.SessionData.token,
      });
    }
  };

  getLoginState() {
    return (
      <div className='mr-2'>
        {this.props.SessionData.user ? (
          <div>
            <span className='text-lg font-bold mr-4'>{`Hello, ${this.props.SessionData.user.name}!`}</span>
            <button
              className='btn btn-sm btn-info mr-5'
              onClick={this.logoutSession}
            >
              {this.props.loading ? (
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
  }

  render() {
    return (
      <div>
        <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box'>
          <div className='flex-1 px-2 mx-2'>
            <span className='text-lg font-bold'>
              <Link to='/'>ELS</Link>
            </span>
          </div>
          <div className='flex-none'>{this.getLoginState()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    SessionData: state.userToken.SessionData,
    loading: state.logout.loading,
  };
};

export const Navbar = connect(mapStateToProps, { logoutUser })(_Navbar);
