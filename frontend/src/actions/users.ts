import axios from 'axios';
import { Dispatch } from 'redux';

import { config } from './config';
import { types, UsersListAction } from './types';

export const getUsersList = () => {
  return async (dispatch: Dispatch) => {
    dispatch<UsersListAction>({
      type: types.userListRequest,
    });
    await axios.get(`${config.URL}/users`).then((res) => {
      dispatch<UsersListAction>({
        type: types.userListSuccess,
        payload: res.data,
      });
    });
  };
};
