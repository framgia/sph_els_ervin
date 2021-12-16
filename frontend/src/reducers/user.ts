import { RegistrationData, RegisterUserAction } from '../actions/user';
import { ActionTypes } from '../actions/types';

export const registerUserReducer = (
  state: RegistrationData[] = [],
  action: RegisterUserAction
) => {
  switch (action.type) {
    case ActionTypes.registerUser:
      return state;
    default:
      return state;
  }
};
