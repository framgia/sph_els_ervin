import axios from 'axios';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { SessionData } from '../../../actions';
import { config } from '../../../actions/config';
import FormError from '../../../components/FormError';
import Loading from '../../../components/Loading';
import { useNavigate } from 'react-router-dom';
import API from '../../../api/baseAPI';

interface Props {
  currentLogin?: SessionData;
}

interface ProfileFormData {
  avatar: FileList;
  email: string;
  name: string;
  old_password?: string;
  new_password?: string;
}

function EditProfilePage({ currentLogin }: Props): ReactElement {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<ProfileFormData>({
    defaultValues: {
      email: currentLogin?.user.email,
      name: currentLogin?.user.name,
      avatar: undefined,
    },
  });
  const watchOldPasswordField = watch('old_password');
  const navigate = useNavigate();

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
          ['image/png', 'image/gif', 'image/jpeg', undefined].includes(
            files[0]?.type
          ) || 'Invalid File Type',
      },
    },
    password: {
      minLength: 8,
    },
  };

  // Provided isDirty function from react hooks form is buggy
  const isDirty = () => {
    return (
      dirtyFields.avatar !== undefined ||
      dirtyFields.email !== undefined ||
      dirtyFields.name !== undefined ||
      dirtyFields.old_password !== undefined ||
      dirtyFields.new_password !== undefined
    );
  };

  const onSubmit = ({
    avatar,
    name,
    email,
    old_password,
    new_password,
  }: ProfileFormData) => {
    if (!isDirty()) return;
    if (!currentLogin) return;
    const newAvatar = avatar[0];
    const formData = new FormData();
    formData.append('_method', 'put');

    if (dirtyFields.avatar) formData.append('avatar', newAvatar);
    formData.append('email', email);
    formData.append('name', name);
    if (old_password && new_password) {
      formData.append('old_password', old_password);
      formData.append('new_password', new_password);
    }
    setLoading(true);
    API.post(`/users/${currentLogin.user.id}`, formData).then((res) => {
      currentLogin.user = res.data;
      navigate('../');
    });
  };

  return (
    <div className='container mx-auto w-1/2 mt-5'>
      <div className='p-10 card bg-base-200 transition-all ease-in-out'>
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

          <label className='label'>Old Password</label>
          <input
            className='input'
            type='password'
            {...register('old_password', profileDataValidation.password)}
          />
          <FormError message={errors.old_password?.message} />

          <label
            className={`label ${
              !watchOldPasswordField && 'hidden'
            } transition-all ease-in-out`}
          >
            New Password
          </label>
          <input
            className={`input ${!watchOldPasswordField && 'hidden'}`}
            type='password'
            {...register('new_password', profileDataValidation.password)}
          />
          <FormError message={errors.new_password?.message} />
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
          {loading && <Loading />}
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
