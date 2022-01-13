import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Category, SessionData } from '../../actions';
import axios from 'axios';
import { config } from '../../actions/config';
import { Link } from 'react-router-dom';

interface Props {
  currentLogin: SessionData;
}

const CategoriesPage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    axios
      .get(`${config.URL}/categories`, {
        headers: {
          Authorization: `Bearer ${props.currentLogin.token}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      });
  };

  const showCategories = () => {
    return categories.map(({ title, description, slug }: Category) => {
      return (
        <div className='card shadow-lg lg:card-side'>
          <div className='card-body'>
            <h2 className='card-title text-left'>{title}</h2>
            <p className='text-left h-12 max-h-12'>{description}</p>
            <Link className='mt-5 btn btn-info w-1/4' to={slug}>
              Start
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div className='container mx-auto'>
      <div className='mt-4 text-4xl left'>Categories</div>
      <div className='mx-auto px-16'>
        <div className='grid grid-cols-2 gap-x-16 gap-y-4 mt-4'>
          {showCategories()}
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

export default connect(mapStateToProps, {})(CategoriesPage);
