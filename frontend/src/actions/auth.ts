import axios from 'axios';
import { Dispatch } from 'redux';
import { LogoutData, LogoutUserAction, types } from './types';
import {
  LoginData,
  LoginUserAction,
  RegisterUserAction,
  RegistrationData,
} from './types';

import { config } from './config';
import { User } from '.';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import API from '../api/baseAPI';

export const registerUser = (registration_data: RegistrationData) => {
  return async (dispatch: Dispatch) => {
    dispatch<RegisterUserAction>({
      type: types.registerUserRequest,
    });
    await axios
      .post<RegistrationData, any, RegistrationData>(
        `${config.URL}/register`,
        registration_data
      )
      .then((res) => {
        dispatch<RegisterUserAction>({
          type: types.registerUserSuccess,
          payload: res.data,
        });
        Cookies.set('SessionData', JSON.stringify(res.data));
        Cookies.set('user_token', res.data.token);
      });
  };
};

export const loginUser = (login_data: LoginData) => {
  return async (dispatch: Dispatch) => {
    dispatch<LoginUserAction>({
      type: types.loginUserRequest,
    });
    await axios
      .post<LoginData, any, LoginData>(`${config.URL}/login`, login_data)
      .then((res) => {
        dispatch<LoginUserAction>({
          type: types.loginUserSuccess,
          payload: res.data,
        });

        Cookies.set('SessionData', JSON.stringify(res.data));
        Cookies.set('user_token', res.data.token);
      });
  };
};

export const logoutUser = ({ user_id, token }: LogoutData) => {
  return async (dispatch: Dispatch) => {
    dispatch<LogoutUserAction>({
      type: types.logoutUserRequest,
    });
    await API.post('/logout', { user_id }).then((res) => {
      Cookies.remove('SessionData');
      Cookies.remove('user_token');
      dispatch<LogoutUserAction>({
        type: types.logoutUserSuccess,
        payload: res.data,
      });
    });
  };
};

export const updateUser = (user: User) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.updateUser, payload: user });
  };
};
