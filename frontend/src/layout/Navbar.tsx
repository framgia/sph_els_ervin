import React, { Component } from 'react';
import '../index.css';
interface Props {}
interface State {}

class Navbar extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box'>
          <div className='flex-1 px-2 mx-2'>
            <span className='text-lg font-bold'>ELS</span>
          </div>
          <div className='flex-none'>
            <a className='btn btn-sm btn-info mr-5' href='*'>
              Login
            </a>
            <a className='btn btn-sm btn-success mr-3' href='*'>
              Register
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
