import axios from 'axios';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { SessionData } from '../../../actions';
import { config } from '../../../actions/config';
import FormError from '../../../components/FormError';
import Loading from '../../../components/Loading';

interface Props {
  currentLogin?: SessionData;
}

interface ProfileFormData {
  avatar: File;
  email: string;
  name: string;
}

function EditProfilePage({ currentLogin }: Props): ReactElement {
  const [loading, setLoading] = useState(false);

  const profileDataValidation = {
    email: {
      pattern: {
        value: /.+@{1}.+[.]{1}.+/,
        message: 'This field must be a valid email',
      },
    },
    name: {},
    avatar: {
      validate: {
        acceptedTypes: (files: any) =>
          ['image/png', 'image/gif', 'image/jpeg'].includes(files[0].type) ||
          'Invalid File Type',
      },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const onSubmit = (data: ProfileFormData) => {
    axios.patch(`${config.URL}/users/`);
  };

  return (
    <div className='container mx-auto w-1/2 mt-5'>
      <div className='p-10 card bg-base-200'>
        <form onSubmit={handleSubmit(onSubmit)} className='form-control'>
          <label className='label'>Email</label>
          <input
            className='input'
            {...register('email', profileDataValidation.email)}
          />
          <FormError message={errors.email?.message} />
          <label className='label'>Name</label>
          <input
            className='input'
            {...register('name', profileDataValidation.name)}
          />
          <FormError message={errors.name?.message} />
          <label className='label'>Avatar</label>
          <input
            type='file'
            {...register('avatar', profileDataValidation.avatar)}
          />
          <FormError message={errors.avatar?.message} />
          <button className='btn btn-info mt-5 w-1/2 mx-auto' type='submit'>
            {loading ? (
              <div className='flex items-center justify-center'>
                <Loading />
                Edit Profile
              </div>
            ) : (
              'Edit Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {})(EditProfilePage);
