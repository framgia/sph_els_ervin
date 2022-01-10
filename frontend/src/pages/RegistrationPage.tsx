import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../actions/user';
import { connect, useDispatch } from 'react-redux';
import FormError from '../components/FormError';
import { RegistrationData } from '../actions/types';

interface Props {
  loading: boolean;
}

function RegistrationPage(props: Props) {
  // This has to be inside to access password.current for validation
  const registrationDataValidation = {
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
    name: {
      required: {
        value: true,
        message: 'This field is required',
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
    password_confirmation: {
      required: {
        value: true,
        message: 'This field is required',
      },
      validate: {
        matches: (value: string) =>
          value === password.current || "Passwords don't match",
      },
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationData>();
  const password = useRef({});
  password.current = watch('password', '');
  const dispatch = useDispatch();

  const onSubmit = (data: RegistrationData) => {
    dispatch(registerUser(data));
  };

  return (
    <div className='container mx-auto w-1/4 mt-5'>
      <div className='p-10 card bg-base-200'>
        <form onSubmit={handleSubmit(onSubmit)} className='form-control'>
          <label className='label'>Email</label>
          <input
            className='input'
            {...register('email', registrationDataValidation.email)}
          />
          <FormError message={errors.email?.message} />
          <label className='label'>Name</label>
          <input
            className='input'
            {...register('name', registrationDataValidation.name)}
          />
          <FormError message={errors.name?.message} />
          <label className='label'>Password</label>
          <input
            type='password'
            className='input'
            {...register('password', registrationDataValidation.password)}
          />
          <FormError message={errors.password?.message} />
          <label className='label'>Confirm Password</label>
          <input
            type='password'
            className='input'
            {...register(
              'password_confirmation',
              registrationDataValidation.password_confirmation
            )}
          />
          <FormError message={errors.password_confirmation?.message} />
          <button className='btn btn-info mt-5 w-1/2 mx-auto' type='submit'>
            {props.loading ? (
              <div className='flex items-center justify-center'>
                <div className='w-4 h-4 border-b-2 border-white-900 rounded-full animate-spin mr-5'></div>
                Register
              </div>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.register.loading,
  };
};

export default connect(mapStateToProps)(RegistrationPage);
