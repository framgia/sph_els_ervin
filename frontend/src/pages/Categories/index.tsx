import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Category, SessionData } from '../../actions';
import axios from 'axios';
import { config } from '../../actions/config';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

interface Props {
  currentLogin: SessionData;
}

const CategoriesPage = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCategories();
  }, []);

  const matchTerm = (term: string): boolean => {
    return term.toLowerCase().indexOf(search) > -1;
  };

  const filterCategories = (): Category[] => {
    return categories.filter(
      ({ title, description }: Category) =>
        matchTerm(title) || matchTerm(description)
    );
  };

  const getCategories = async () => {
    axios
      .get(`${config.URL}/categories`, {
        headers: {
          Authorization: `Bearer ${props.currentLogin.token}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      });
  };

  const showCategories = () => {
    return filterCategories().map(({ title, description, slug }: Category) => {
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

  const renderSearchBar = () => {
    return (
      <div className='form-control my-5'>
        <label className='input-group justify-center'>
          <span>Search</span>
          <input
            type='text'
            placeholder='Search Category'
            className='input input-bordered'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </label>
      </div>
    );
  };

  return (
    <div className='container mx-auto'>
      <div className='mt-4 text-4xl left'>Categories</div>
      {renderSearchBar()}
      <div className='mx-auto px-16'>
        <div className='grid grid-cols-2 gap-x-16 gap-y-4 mt-4'>
          {loading ? <Loading /> : showCategories()}
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
