import React from 'react';
import { useState, useEffect } from 'react';
import { Category } from '../../../actions';
import axios from 'axios';
import { config } from '../../../actions/config';
import { SessionData } from '../../../actions/types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../../../api/baseAPI';
import CategoryAPI from '../../../api/CategoryAPI';

interface Props {
  currentLogin: SessionData;
}

const CategoriesEditPage = ({ currentLogin: { user, token } }: Props) => {
  const [tab, setTab] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    CategoryAPI.index().then((res) => {
      setCategories(res.data);
    });
  };

  const deleteCategory = (slug: string) => {
    CategoryAPI.delete(slug).then((res) => {
      setCategories(categories.filter((category) => category.slug !== slug));
    });
  };

  const renderTableData = () => {
    if (!categories) return;

    return categories.map(({ title, description, slug }) => (
      <tr>
        <td>{title}</td>
        <td>{description}</td>
        <td>
          <div className='flex gap-x-2 align-middle justify-center'>
            <Link to={slug} className='btn btn-info'>
              Add Word
            </Link>
            <Link to={`edit/${slug}`} className='btn btn-info'>
              Edit
            </Link>
            <button
              onClick={() => deleteCategory(slug)}
              className='btn bg-red-600'
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className='container mx-auto'>
      <h2 className='text-xl my-auto'>
        Categories
        <Link to='new' className='float-right btn btn-primary w-24 mb-2'>
          New Category
        </Link>
      </h2>
      <table className='table w-full'>
        <thead className='text-center'>
          <tr>
            <td>Category</td>
            <td>Description</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>{categories && renderTableData()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {})(CategoriesEditPage);
