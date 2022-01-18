import React from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../../../components/FormError';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionData, Category } from '../../../actions/types';
import { connect } from 'react-redux';
import CategoryAPI from '../../../api/CategoryAPI';

interface FormData {
  title: string;
  description: string;
}

interface Props {
  currentLogin: SessionData;
}

const AddEditCategory = ({ currentLogin: { user, token } }: Props) => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data: FormData) => {
    if (categorySlug) {
      CategoryAPI.update(data, categorySlug).then((res) =>
        navigate('/admin/categories')
      );
    } else {
      CategoryAPI.save(data).then((res) => {
        navigate('/admin/categories');
      });
    }
  };

  useEffect(() => {
    if (!categorySlug) return;
    CategoryAPI.get(categorySlug).then((res) => {
      reset(res.data);
    });
  }, [reset]);

  const categoryDataValidation = {
    title: {
      required: {
        value: true,
        message: 'This field is required',
      },
    },
    description: {
      required: {
        value: true,
        message: 'This field is required',
      },
    },
  };

  return (
    <div className='container card mx-auto'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='form-control w-2/3 mx-auto bg-base-200 p-10 card'
      >
        <label className='label'>
          <span className='label-text'>Category Title</span>
        </label>
        <input
          type='text'
          placeholder='Category Title'
          className='input input-accent input-bordered'
          {...register('title', categoryDataValidation.title)}
        />
        <FormError message={errors.title?.message} />
        <label className='label'>
          <span className='label-text mt-5'>Category Title</span>
        </label>
        <textarea
          placeholder='Category Description'
          className='textarea textarea-bordered textarea-accent'
          {...register('description', categoryDataValidation.description)}
        />
        <FormError message={errors.description?.message} />
        <input
          type='submit'
          className='btn btn-info w-1/4 mx-auto mt-5'
          value='save'
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {})(AddEditCategory);
