import axios from 'axios';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { SessionData } from '../../../actions';
import { config } from '../../../actions/config';
import FormError from '../../../components/FormError';
import Loading from '../../../components/Loading';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentLogin?: SessionData;
}

interface ProfileFormData {
  avatar: FileList;
  email: string;
  name: string;
}

function EditProfilePage({ currentLogin }: Props): ReactElement {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ProfileFormData>({
    defaultValues: {
      email: currentLogin?.user.email,
      name: currentLogin?.user.name,
      avatar: undefined,
    },
  });
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
  };

  // Provided isDirty function from react hooks form is buggy
  const isDirty = () => {
    return (
      dirtyFields.avatar !== undefined ||
      dirtyFields.email !== undefined ||
      dirtyFields.name !== undefined
    );
  };

  const onSubmit = ({ avatar, name, email }: ProfileFormData) => {
    if (!isDirty()) return;
    if (!currentLogin) return;
    const newAvatar = avatar[0];
    const formData = new FormData();
    formData.append('_method', 'put');

    if (dirtyFields.avatar) formData.append('avatar', newAvatar);
    formData.append('email', email);
    formData.append('name', name);
    setLoading(true);
    axios
      .post(`${config.URL}/users/${currentLogin.user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${currentLogin.token}`,
        },
      })
      .then((res) => {
        currentLogin.user = res.data;
        navigate('../');
      });
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
          {loading ? <Loading /> : ''}
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
