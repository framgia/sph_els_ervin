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
import { url } from './config';

export const registerUser = (registration_data: RegistrationData) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post<RegistrationData, any, RegistrationData>(
        `${url}/register`,
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
      .post<LoginData, any, LoginData>(`${url}/login`, login_data)
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

export const logoutUser = (logoutData: LogoutData) => {
  return async (dispatch: Dispatch) => {
    await axios.post(`${url}/logout`, { user_id: logoutData }).then((res) => {
      dispatch<LogoutUserAction>({
        type: ActionTypes.logoutUser,
        payload: res.data,
      });

      localStorage.removeItem('SessionData');
      alert('Success!');
    });
  };
};
