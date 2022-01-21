import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { LoginData } from '../../actions/types';
import { loginUser } from '../../actions/auth';
import FormError from '../../components/FormError';
import Loading from '../../components/Loading';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const dispatch = useDispatch();

  useEffect(() => {
    props.loading && navigate(from, { replace: true });
  }, [props.loading]);

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
              <span className='flex items-center justify-center'>
                <Loading />
                Login
              </span>
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
