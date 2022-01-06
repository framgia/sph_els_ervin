import { RegisterUserAction, LoginUserAction } from '../actions/types';
import { ActionTypes } from '../actions/types';

export const registerUserReducer = (state = {}, action: RegisterUserAction) => {
  switch (action.type) {
    case ActionTypes.registerUser:
      return action.payload;
    default:
      return state;
  }
};

export const loginUserReducer = (state = {}, action: LoginUserAction) => {
  switch (action.type) {
    case ActionTypes.loginUser:
      return action.payload;
    default:
      return state;
  }
};

const currentUserToken = localStorage.getItem('currentUserToken')
  ? JSON.parse(localStorage.getItem('currentUserToken') || '')
  : '';

export const UserTokenReducer = (state = { currentUserToken }, action: any) => {
  switch (action.type) {
    case ActionTypes.getCurrentUserToken:
      return action.payload;
    case ActionTypes.loginUser:
      return { ...state, currentUserToken: action.payload };
    case ActionTypes.registerUser:
      return { ...state, currentUserToken: action.payload };
    default:
      return state;
  }
};
