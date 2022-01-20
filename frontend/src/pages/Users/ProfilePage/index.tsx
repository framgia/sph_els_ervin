import { Activity, SessionData, User } from '../../../actions';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { config } from '../../../actions/config';
import Loading from '../../../components/Loading';
import {
  getFollowList,
  followUser,
  unfollowUser,
} from '../../../actions/follows';
import { FollowData } from '../../../actions/types';
import FollowButton from '../../../components/FollowButton';
import API from '../../../api/baseAPI';

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
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [activities, setActivities] = useState<Activity[]>();
  const [wordsLearned, setWordsLearned] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      getUser();
      setFollowCounts();
      if (props.currentLogin) {
        const {
          token,
          user: { id },
        } = props.currentLogin;

        dispatch(getFollowList(id, token));
      }
    }
    getWordsLearned();
  }, []);

  useEffect(() => {
    getActivites();
  }, [following]);

  const getUser = async () => {
    if (!props.currentLogin) return;
    await API.get(`/users/${userId}`).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  };

  const getWordsLearned = () => {
    if (!props.currentLogin) return;
    API.get(`/users/${userId}/words`).then((res) => {
      setWordsLearned(res.data);
    });
  };

  const getFollowingIds = () => {
    return props.followsList.map((followData: FollowData) => {
      return followData.following_id;
    });
  };

  const setFollowCounts = () => {
    setFollowingCount();
    setFollowersCount();
  };

  const setFollowersCount = async () => {
    await API.get(`/follows/${userId}/followers`).then((res: any) => {
      setFollowers(res.data.length);
    });
  };

  const setFollowingCount = async () => {
    await API.get(`/follows/${userId}/following`).then((res: any) => {
      setFollowing(res.data.length);
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
                followers={followers}
                setFollowers={setFollowers}
                userId={id}
                className='px-10'
                following={getFollowingIds().includes(user.id)}
              />
            )}
            <p className='mt-2'>Words Learned: {wordsLearned}</p>
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
          {followers}
        </div>
        <div className='mt-2'>
          <p>Following</p>
          {following}
        </div>
      </>
    );
  };

  const getActivites = async () => {
    if (!props.currentLogin || !userId) return;
    if (props.currentLogin.user.id != parseInt(userId)) {
      API.get<Activity[]>(`/activities/${userId}`).then((res) =>
        setActivities(res.data)
      );
    } else {
      API.get<Activity[]>('/activities').then((res) => {
        setActivities(
          res.data.filter((activity) =>
            [...getFollowingIds(), props.currentLogin?.user.id].includes(
              activity.user_id
            )
          )
        );
      });
    }
  };

  const showActivities = () => {
    if (!activities) return;
    return activities.map((activity) => (
      <div
        className={`card bg-gray-${
          activity.user_id == props.currentLogin?.user.id ? 600 : 500
        } mx-4 py-2 text-left px-5`}
      >
        {activity.message}
        <span className='text-xs text-gray-400 text-left mx-4'>
          {activity.time_diff}
        </span>
      </div>
    ));
  };

  return (
    <>
      <div className='container grid grid-cols-2 mt-3 mx-auto gap-x-6'>
        {loading && <Loading />}
        {user && showProfile()}
        <div>
          <div className='card shadow bg-base-200 flex flex-col py-6 gap-y-4'>
            <h2 className='text-xl my-2'>Activites</h2>
            {activities && showActivities()}
          </div>
        </div>
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
