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
        localStorage.setItem('SessionData', JSON.stringify(res.data));
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

        localStorage.setItem('SessionData', JSON.stringify(res.data));
      });
  };
};

export const logoutUser = ({ user_id, token }: LogoutData) => {
  return async (dispatch: Dispatch) => {
    dispatch<LogoutUserAction>({
      type: types.logoutUserRequest,
    });
    await axios
      .post(
        `${config.URL}/logout`,
        { user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        localStorage.removeItem('SessionData');
        dispatch<LogoutUserAction>({
          type: types.logoutUserSuccess,
          payload: res.data,
        });
      });
    alert('Success!');
  };
};
