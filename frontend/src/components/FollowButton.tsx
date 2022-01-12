import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, FollowRequestData } from '../actions/types';
import { followUser, unfollowUser } from '../actions/follows';
import { useEffect } from 'react';

export interface IAppProps {
  followUser: Function;
  unfollowUser: Function;
  currentLogin?: {
    user: User;
    token: string;
  };
  following?: boolean;
  className?: string;
  userId: number;
  setFollowers?: Function;
  followers?: number;
}

function FollowButton(props: IAppProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, [props.setFollowers]);

  const followUser = (follow: number) => {
    if (props.currentLogin) {
      let followData: FollowRequestData = {
        follower: props.currentLogin.user.id,
        following: follow,
      };
      if (props.setFollowers && props.followers) {
        props.setFollowers(props.followers + 1);
      }
      dispatch(props.followUser(followData, props.currentLogin.token));
    } else {
      navigate('/login', { replace: true });
    }
  };

  const unfollowUser = (follow: number) => {
    if (props.currentLogin) {
      let followData: FollowRequestData = {
        follower: props.currentLogin.user.id,
        following: follow,
      };
      if (props.setFollowers && props.followers) {
        props.setFollowers(props.followers - 1);
      }
      dispatch(props.unfollowUser(followData, props.currentLogin.token));
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <>
      {!props.following ? (
        <button
          className={`btn btn-info ${props.className}`}
          onClick={() => followUser(props.userId)}
        >
          Follow
        </button>
      ) : (
        <button
          className={`btn btn-secondary ${props.className}`}
          onClick={() => unfollowUser(props.userId)}
        >
          Unfollow
        </button>
      )}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
})(FollowButton);
