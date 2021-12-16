import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { LoginData } from '../actions/types';
import { loginUser } from '../actions/user';

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginData>();
  const dispatch = useDispatch();
  const onSubmit = (data: LoginData) => {
    dispatch(loginUser(data));
  };

  return (
    <div className='container mx-auto w-1/4 mt-5'>
      <div className='p-10 card bg-base-200'>
        <form onSubmit={handleSubmit(onSubmit)} className='form-control'>
          <label className='label'>Email</label>
          <input className='input' {...register('email')} />
          <label className='label'>Password</label>
          <input type='password' className='input' {...register('password')} />
          <input
            className='btn btn-info mt-5 w-1/2 mx-auto'
            type='submit'
            value='Login'
          />
        </form>
      </div>
    </div>
  );
}
