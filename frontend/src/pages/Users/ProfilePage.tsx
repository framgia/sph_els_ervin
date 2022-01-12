import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SessionData, User } from '../../actions';
import { config } from '../../actions/config';
import Loading from '../../components/Loading';

interface IAppProps {
  currentLogin: SessionData;
}

const ProfilePage = (props: IAppProps) => {
  const { userId } = useParams();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getUser(parseInt(userId));
    }
  }, []);

  const getUser = async (id: number) => {
    await axios
      .get(`${config.URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${props.currentLogin.token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      });
  };

  const showProfile = () => {
    if (!user) return;

    const { avatar, name } = user;
    const isCurrentUser = user.id === props.currentLogin.user.id;

    return (
      <>
        <div className='card shadow-2xl p-5'>
          <figure>
            <div className='mt-2'>
              <img
                src={config.IMG_URL + avatar}
                className='inline object-cover w-64 h-64 rounded-full mx-auto'
                alt='user avatar'
              />
            </div>
          </figure>
          <div className='card-body grid grid-cols-2'>
            <h2 className='card-title col-span-2 mb-2'>{name}</h2>
            <hr className='col-span-2 mb-2' />
            {showFollowers()}
          </div>
          <div className='col-span-2'>
            {!isCurrentUser && (
              <button className='btn btn-accent px-5'>Follow</button>
            )}
            <p className='mt-2'>Words Learned: 420</p>
          </div>
        </div>
      </>
    );
  };

  const showFollowers = () => {
    return (
      <>
        <div className='mt-2'>
          <p>Followers</p>
          <p>12</p>
        </div>
        <div className='mt-2'>
          <p>Following</p>
          <p>12</p>
        </div>
      </>
    );
  };

  const showActivities = () => {
    return <div className='card shadow'>Activites</div>;
  };

  return (
    <>
      <div className='container grid grid-cols-2 mt-3 mx-auto'>
        {loading && <Loading />}
        {user && showProfile()}
        <div>{showActivities()}</div>
      </div>
    </>
  );
};

const mapState2Props = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapState2Props, {})(ProfilePage);
