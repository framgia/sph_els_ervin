import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser, RegistrationData } from '../actions/user';
import { useDispatch } from 'react-redux';

export default function RegistrationPage() {
  const { register, handleSubmit } = useForm<RegistrationData>();
  const dispatch = useDispatch();
  const onSubmit = (data: RegistrationData) => {
    dispatch(registerUser(data));
  };

  return (
    <div className='container mx-auto w-1/4 mt-5'>
      <div className='p-10 card bg-base-200'>
        <form onSubmit={handleSubmit(onSubmit)} className='form-control'>
          <label className='label'>Email</label>
          <input className='input' {...register('email')} />
          <label className='label'>Name</label>
          <input className='input' {...register('name')} />
          <label className='label'>Password</label>
          <input type='password' className='input' {...register('password')} />
          <label className='label'>Confirm Password</label>
          <input
            type='password'
            className='input'
            {...register('password_confirmation')}
          />
          <input
            className='btn btn-info mt-5 w-1/2 mx-auto'
            type='submit'
            value='Register'
          />
        </form>
      </div>
    </div>
  );
}
