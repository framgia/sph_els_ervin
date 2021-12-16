import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux';

interface Props {
  currentUserToken: string;
}

class _Navbar extends Component<Props> {
  getLoginState() {
    return (
      <p className='mr-2'>{this.props.currentUserToken ? 'Logged In' : ''}</p>
    );
  }

  render() {
    return (
      <div>
        <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box'>
          <div className='flex-1 px-2 mx-2'>
            <span className='text-lg font-bold'>ELS</span>
          </div>
          <div className='flex-none'>
            {this.getLoginState()}
            <a className='btn btn-sm btn-info mr-5' href='/login'>
              Login
            </a>
            <a className='btn btn-sm btn-success mr-3' href='/register'>
              Register
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currentUserToken: state.userToken.currentUserToken.token,
  };
};

export const Navbar = connect(mapStateToProps, {})(_Navbar);
