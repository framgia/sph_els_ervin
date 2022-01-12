import { FollowData } from '../actions/types';
import {
  FollowUserAction,
  types,
  UnfollowUserAction,
  GetFollowListAction,
} from '../actions/types';

export const followsReducer = (
  state = { followsList: [] },
  action: FollowUserAction | UnfollowUserAction | GetFollowListAction
) => {
  switch (action.type) {
    case types.getFollowListRequest:
      return {
        ...state,
        followsListLoading: true,
      };
    case types.getFollowListSuccess:
      return {
        ...state,
        followsListLoading: false,
        followsList: action.payload,
      };
    case types.followUserRequest:
      return {
        ...state,
        followLoading: true,
      };
    case types.followUserSuccess:
      return {
        ...state,
        followLoading: false,
        followsList: [...state.followsList, action.payload],
      };
    case types.unfollowUserRequest:
      return {
        ...state,
        unfollowLoading: true,
      };
    case types.unfollowUserSuccess:
      return {
        ...state,
        unfollowLoading: false,
        followsList: state.followsList.filter((follow: FollowData, index) =>
          isFollowData(action.payload) ? follow.id !== action.payload.id : ''
        ),
      };
    default:
      return state;
  }
};

function isFollowData(object: any): object is FollowData {
  return 'follower_id' in object;
}
