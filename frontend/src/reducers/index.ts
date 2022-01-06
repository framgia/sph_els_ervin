import { combineReducers } from 'redux';
import { logoutUserReducer } from './user';
import {
  registerUserReducer,
  loginUserReducer,
  UserTokenReducer,
} from './user';

export const reducers = combineReducers({
  register: registerUserReducer,
  login: loginUserReducer,
  logout: logoutUserReducer,
  userToken: UserTokenReducer,
});
