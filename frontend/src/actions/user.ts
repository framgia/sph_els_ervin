import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

const url = 'http://127.0.0.1:8000/api';

export interface RegistrationData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterUserAction {
  type: ActionTypes.registerUser;
}

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
        });
        alert('Success!');
      });
  };
};
