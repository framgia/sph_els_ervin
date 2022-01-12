import { combineReducers } from 'redux';
import { getUsersListReducer, getUserDataReducer } from './users';
import {
  registerUserReducer,
  loginUserReducer,
  userTokenReducer,
  logoutUserReducer,
} from './auth';

export const reducers = combineReducers({
  register: registerUserReducer,
  login: loginUserReducer,
  logout: logoutUserReducer,
  userToken: userTokenReducer,
  usersList: getUsersListReducer,
  userData: getUserDataReducer,
});
