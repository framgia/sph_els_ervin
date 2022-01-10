import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LogoutData,
  LogoutUserAction,
  registerTypes,
  loginTypes,
} from './types';
import {
  LoginData,
  LoginUserAction,
  RegisterUserAction,
  RegistrationData,
} from './types';

import { config } from './config';
import { logoutTypes } from './types';

export const registerUser = (registration_data: RegistrationData) => {
  return async (dispatch: Dispatch) => {
    dispatch<RegisterUserAction>({
      type: registerTypes.registerUserRequest,
    });
    await axios
      .post<RegistrationData, any, RegistrationData>(
        `${config.URL}/register`,
        registration_data
      )
      .then((res) => {
        dispatch<RegisterUserAction>({
          type: registerTypes.registerUserSuccess,
          payload: res.data,
        });
        localStorage.setItem('SessionData', JSON.stringify(res.data));
      });
  };
};

export const loginUser = (login_data: LoginData) => {
  return async (dispatch: Dispatch) => {
    dispatch<LoginUserAction>({
      type: loginTypes.loginUserRequest,
    });
    await axios
      .post<LoginData, any, LoginData>(`${config.URL}/login`, login_data)
      .then((res) => {
        dispatch<LoginUserAction>({
          type: loginTypes.loginUserSuccess,
          payload: res.data,
        });

        localStorage.setItem('SessionData', JSON.stringify(res.data));
      });
  };
};

export const logoutUser = ({ user_id, token }: LogoutData) => {
  return async (dispatch: Dispatch) => {
    dispatch<LogoutUserAction>({
      type: logoutTypes.logoutUserRequest,
    });
    await axios
      .post(
        `${config.URL}/logout`,
        { user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        dispatch<LogoutUserAction>({
          type: logoutTypes.logoutUserSuccess,
          payload: res.data,
        });

        localStorage.removeItem('SessionData');
      });
    alert('Success!');
  };
};
