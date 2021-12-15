import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  email: string;
  name: string;
  password: string;
}

export default function RegistrationPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
