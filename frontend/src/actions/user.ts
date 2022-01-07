import axios from 'axios';
import { Dispatch } from 'redux';
import { LogoutData, LogoutUserAction } from './types';
import {
  ActionTypes,
  LoginData,
  LoginUserAction,
  RegisterUserAction,
  RegistrationData,
} from './types';

import { config } from './config';

export const registerUser = (registration_data: RegistrationData) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post<RegistrationData, any, RegistrationData>(
        `${config.URL}/register`,
        registration_data
      )
      .then((res) => {
        dispatch<RegisterUserAction>({
          type: ActionTypes.registerUser,
          payload: res.data,
        });

        localStorage.setItem('SessionData', JSON.stringify(res.data));
        alert('Success!');
      });
  };
};

export const loginUser = (login_data: LoginData) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post<LoginData, any, LoginData>(`${config.URL}/login`, login_data)
      .then((res) => {
        dispatch<LoginUserAction>({
          type: ActionTypes.loginUser,
          payload: res.data,
        });

        localStorage.setItem('SessionData', JSON.stringify(res.data));
        alert('Success!');
      });
  };
};

export const logoutUser = ({ user_id, token }: LogoutData) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post(
        `${config.URL}/logout`,
        { user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        dispatch<LogoutUserAction>({
          type: ActionTypes.logoutUser,
          payload: res.data,
        });

        localStorage.removeItem('SessionData');
      });
    alert('Success!');
  };
};
