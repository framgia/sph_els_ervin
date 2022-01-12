import axios from 'axios';
import { SessionData, User } from '../../actions';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { config } from '../../actions/config';
import Loading from '../../components/Loading';
import { getFollowList, followUser, unfollowUser } from '../../actions/follows';
import { FollowData } from '../../actions/types';
import FollowButton from '../../components/FollowButton';

export interface IAppProps {
  followUser: Function;
  unfollowUser: Function;
  getFollowList: Function;
  currentLogin?: SessionData;
  followsList: FollowData[];
}

const ProfilePage = (props: IAppProps) => {
  const { userId } = useParams();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      getUser(parseInt(userId));
      if (props.currentLogin) {
        const {
          token,
          user: { id },
        } = props.currentLogin;

        dispatch(getFollowList(id, token));
      }
    }
  }, []);

  const getUser = async (id: number) => {
    if (!props.currentLogin) return;
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

  const getFollowingIds = () => {
    return props.followsList.map((followData: FollowData) => {
      return followData.following_id;
    });
  };

  const showProfile = () => {
    if (!user || !props.currentLogin) return;
    const { avatar, name, id } = user;
    const isCurrentUser = user.id === props.currentLogin.user.id;

    return (
      <>
        <div className='card shadow-2xl p-5'>
          <figure>
            <div className='mt-2'>
              <img
                src={config.IMG_URL + avatar}
                className='object-cover w-64 h-64 rounded-full mx-auto'
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
            {isCurrentUser ? (
              <Link
                className='btn btn-accent btn-active'
                to={`/users/${props.currentLogin?.user.id}/edit`} // This is done on purpose to ensure the user can only edit their own profile
              >
                Edit Profile
              </Link>
            ) : (
              <FollowButton
                userId={id}
                className='px-10'
                following={getFollowingIds().includes(user.id)}
              />
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
    followsList: state.follows.followsList,
  };
};

export default connect(mapState2Props, {
  getFollowList,
  followUser,
  unfollowUser,
})(ProfilePage);
