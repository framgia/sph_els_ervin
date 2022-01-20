import { types } from '../actions/types';
import { updateUser } from '../actions/auth';
import Cookies from 'js-cookie';
import {
  RegisterUserAction,
  LoginUserAction,
  UserTokenAction,
  LogoutUserAction,
  AuthenticationPayloadData,
} from '../actions/types';

export const registerUserReducer = (state = {}, action: RegisterUserAction) => {
  switch (action.type) {
    case types.registerUserRequest:
      return {
        ...state,
        loading: true,
      };
    case types.registerUserSuccess:
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
    case types.loginUserRequest:
      return {
        ...state,
        loading: true,
      };
    case types.loginUserSuccess:
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
    case types.logoutUserRequest:
      return {
        ...state,
        loading: true,
      };
    case types.logoutUserSuccess:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const SessionData: AuthenticationPayloadData =
  Cookies.get('SessionData') !== ''
    ? { SessionData: JSON.parse(Cookies.get('SessionData') || '') }
    : { SessionData: '' };

export const userTokenReducer = (
  state: AuthenticationPayloadData = SessionData,
  action: UserTokenAction
) => {
  switch (action.type) {
    case types.loginUserSuccess:
      return { ...state, SessionData: action.payload };
    case types.logoutUserSuccess:
      return { ...state, SessionData: null };
    case types.registerUserSuccess:
      return { ...state, SessionData: action.payload };
    case types.updateUser:
      return {
        ...state,
        SessionData: { user: action.payload, token: state.SessionData.token },
      };
    default:
      return state;
  }
};
