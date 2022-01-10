import { registerTypes, loginTypes, logoutTypes } from '../actions/types';
import {
  RegisterUserAction,
  LoginUserAction,
  UserTokenActions,
  LogoutUserAction,
  AuthenticationPayloadData,
} from '../actions/types';

export const registerUserReducer = (state = {}, action: RegisterUserAction) => {
  switch (action.type) {
    case registerTypes.registerUserRequest:
      return {
        ...state,
        loading: true,
      };
    case registerTypes.registerUserSuccess:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const loginUserReducer = (state = {}, action: LoginUserAction) => {
  switch (action.type) {
    case loginTypes.loginUserRequest:
      return {
        ...state,
        loading: true,
      };
    case loginTypes.loginUserSuccess:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const logoutUserReducer = (state = {}, action: LogoutUserAction) => {
  switch (action.type) {
    case logoutTypes.logoutUserRequest:
      return {
        ...state,
        loading: true,
      };
    case logoutTypes.logoutUserSuccess:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const SessionData: AuthenticationPayloadData = localStorage.getItem(
  'SessionData'
)
  ? { SessionData: JSON.parse(localStorage.getItem('SessionData') || '') }
  : { SessionData: '' };

export const userTokenReducer = (
  state: AuthenticationPayloadData = SessionData,
  action: UserTokenActions
) => {
  switch (action.type) {
    case loginTypes.loginUserSuccess:
      return { ...state, SessionData: action.payload };
    case logoutTypes.logoutUserSuccess:
      return { ...state, SessionData: null };
    case registerTypes.registerUserSuccess:
      return { ...state, SessionData: action.payload };
    default:
      return state;
  }
};
