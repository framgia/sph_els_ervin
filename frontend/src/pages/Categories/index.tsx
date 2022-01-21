import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Category, SessionData } from '../../actions';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { UserProgress, QuizStatus } from '../../actions/types';
import API from '../../api/baseAPI';

interface Props {
  currentLogin: SessionData;
}

const CategoriesPage = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<UserProgress[]>([]);

  useEffect(() => {
    getCategories();
    getAllStatus();
  }, []);

  const getAllStatus = async () => {
    API.get<UserProgress[]>(
      `/users/${props.currentLogin.user.id}/progress`
    ).then((res) => {
      setStatus(res.data);
    });
  };

  const getStatus = (category: number) => {
    if (status.length === 0 || status.length === undefined) return;
    return status.filter(
      (status_item) => status_item.category_id == category
    )[0];
  };

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
    API.get<Category[]>('/categories').then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  };

  const showCategories = () => {
    if (!status) return;
    return filterCategories().map(
      ({ title, description, slug, id }: Category) => (
        <div className='card shadow-lg lg:card-side'>
          <div className='card-body'>
            <h2 className='card-title text-left'>{title}</h2>
            <p className='text-left h-12 max-h-12'>{description}</p>
            <Link className='mt-5 btn btn-info w-1/4' to={slug}>
              {getStatus(id) !== undefined
                ? getStatus(id)?.status !== QuizStatus.UNFINISHED
                  ? 'View Results'
                  : 'Continue'
                : 'Start'}
            </Link>
          </div>
        </div>
      )
    );
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
