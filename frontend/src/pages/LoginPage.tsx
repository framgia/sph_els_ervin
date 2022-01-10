import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { LoginData } from '../actions/types';
import { loginUser } from '../actions/user';
import { useForm } from 'react-hook-form';
import FormError from '../components/FormError';

interface Props {
  loading: boolean;
}

function LoginPage(props: Props) {
  const loginDataValidation = {
    email: {
      required: {
        value: true,
        message: 'This field is required',
      },
      pattern: {
        value: /.+@{1}.+[.]{1}.+/,
        message: 'This field must be a valid email',
      },
    },
    password: {
      required: {
        value: true,
        message: 'This field is required',
      },
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const dispatch = useDispatch();

  const onSubmit = (data: LoginData) => {
    dispatch(loginUser(data));
  };

  return (
    <div className='container mx-auto w-1/4 mt-5'>
      <div className='p-10 card bg-base-200'>
        <form onSubmit={handleSubmit(onSubmit)} className='form-control'>
          <label className='label'>Email</label>
          <input
            className='input'
            {...register('email', loginDataValidation.email)}
          />
          <FormError message={errors.email?.message} />
          <label className='label'>Password</label>
          <input
            type='password'
            className='input'
            {...register('password', loginDataValidation.password)}
          />
          <FormError message={errors.password?.message} />
          <button className='btn btn-info mt-5 w-1/2 mx-auto' type='submit'>
            {props.loading ? (
              <div className='flex items-center justify-center'>
                <div className='w-4 h-4 border-b-2 border-white-900 rounded-full animate-spin mr-5'></div>
                Login
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.login.loading,
  };
};

export default connect(mapStateToProps)(LoginPage);
