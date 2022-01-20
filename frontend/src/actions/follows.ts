import { Dispatch } from 'redux';
import API from '../api/baseAPI';
import {
  types,
  FollowUserAction,
  FollowData,
  UnfollowUserAction,
  GetFollowListAction,
} from './types';

export const followUser = (followData: FollowData, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<FollowUserAction>({
      type: types.followUserRequest,
    });
    await API.post('/follows', followData).then((res) => {
      dispatch<FollowUserAction>({
        type: types.followUserSuccess,
        payload: res.data,
      });
    });
  };
};

export const unfollowUser = (unfollowData: FollowData, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<UnfollowUserAction>({
      type: types.unfollowUserRequest,
    });
    await API.delete('/follows', {
      data: unfollowData,
    }).then((res) => {
      dispatch<UnfollowUserAction>({
        type: types.unfollowUserSuccess,
        payload: res.data,
      });
    });
  };
};

export const getFollowList = (user: number, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<GetFollowListAction>({
      type: types.getFollowListRequest,
    });
    await API.get(`/follows/${user}/following`).then((res) => {
      dispatch<GetFollowListAction>({
        type: types.getFollowListSuccess,
        payload: res.data,
      });
    });
  };
};
