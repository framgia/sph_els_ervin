import axios from 'axios';
import { Dispatch } from 'redux';
import {
  ActionTypes,
  LoginData,
  LoginUserAction,
  RegisterUserAction,
  RegistrationData,
} from './types';

const url = 'http://127.0.0.1:8000/api';

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

        localStorage.setItem(
          'currentUserToken',
          JSON.stringify(res.data.token)
        );

        alert('Success!');
      });
  };
};
