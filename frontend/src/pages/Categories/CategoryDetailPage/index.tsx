import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Category, SessionData } from '../../../actions';
import axios from 'axios';
import { config } from '../../../actions/config';
import { Link } from 'react-router-dom';

interface Props {
  currentLogin: SessionData;
}

const CategoryDetailPage = (props: Props) => {
  return (
    <div className='container mx-auto'>
      <div className='mt-4 text-4xl left'>Categories</div>
      <div className='mx-auto px-16'>
        <div className='grid grid-cols-2 gap-x-16 gap-y-4 mt-4'>
          Category Details
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {})(CategoryDetailPage);
