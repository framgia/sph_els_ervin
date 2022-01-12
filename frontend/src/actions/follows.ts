import axios from 'axios';
import { Dispatch } from 'redux';
import { config } from './config';
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
    await axios
      .post(`${config.URL}/follows`, followData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
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
    await axios
      .delete(`${config.URL}/follows`, {
        headers: { Authorization: `Bearer ${token}` },
        data: unfollowData,
      })
      .then((res) => {
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
    await axios
      .get(`${config.URL}/follows/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch<GetFollowListAction>({
          type: types.getFollowListSuccess,
          payload: res.data,
        });
      });
  };
};
