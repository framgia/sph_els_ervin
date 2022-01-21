import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { User, FollowData, SessionData } from '../../actions/types';
import Loading from '../../components/Loading';
import { config } from '../../actions/config';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser, getFollowList } from '../../actions/follows';
import FollowButton from '../../components/FollowButton';
import API from '../../api/baseAPI';

export interface IAppProps {
  followUser: Function;
  unfollowUser: Function;
  getFollowList: Function;
  currentLogin?: SessionData;
  followsList: FollowData[];
}

function ListUsersPage(props: IAppProps) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsersList();
    if (props.currentLogin) {
      const {
        token,
        user: { id },
      } = props.currentLogin;

      dispatch(getFollowList(id, token));
    }
  }, [dispatch, props.currentLogin]);

  const getUsersList = async () => {
    await API.get('/users').then((res) => {
      setLoading(false);
      setUsers(res.data);
    });
  };

  const getFollowingIds = () => {
    return props.followsList.map((followData: FollowData) => {
      return followData.following_id;
    });
  };

  const renderBody = () => {
    return users.map((user: User) => (
      <tr>
        <td>
          <img
            src={config.IMG_URL + user.avatar}
            alt='User Avatar'
            className='w-16 h-16'
          />
        </td>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.email}</td>
        <td>
          <div>
            {/* {Logical Operators can be combined but this is easier to read} */}
            {props.currentLogin &&
              (user.id !== props.currentLogin.user.id ? (
                <FollowButton
                  userId={user.id}
                  following={getFollowingIds().includes(user.id)}
                />
              ) : (
                <Link to={`${user.id}`} className='btn btn-accent'>
                  View Profile
                </Link>
              ))}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className='overflow-x-auto mt-4'>
      {loading && <Loading />}
      <table className='table w-3/4 table-zebra mx-auto'>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{users && props.followsList && renderBody()}</tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
    followsList: state.follows.followsList,
  };
};

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
  getFollowList,
})(ListUsersPage);
