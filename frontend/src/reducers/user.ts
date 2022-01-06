import {
  RegisterUserAction,
  LoginUserAction,
  ActionTypes,
  UserTokenActions,
  LogoutUserAction,
  AuthenticationPayloadData,
} from '../actions/types';

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

export const logoutUserReducer = (state = {}, action: LogoutUserAction) => {
  switch (action.type) {
    case ActionTypes.logoutUser:
      return action.payload;
    default:
      return state;
  }
};

const SessionData: AuthenticationPayloadData = localStorage.getItem(
  'SessionData'
)
  ? JSON.parse(localStorage.getItem('SessionData') || '')
  : '';

export const userTokenReducer = (state = { SessionData }, action: any): any => {
  switch (action.type) {
    case ActionTypes.loginUser:
      return { ...state, SessionData: action.payload };
    case ActionTypes.logoutUser:
      return { ...state, SessionData: null };
    case ActionTypes.registerUser:
      return { ...state, SessionData: action.payload };
    default:
      return state;
  }
};
