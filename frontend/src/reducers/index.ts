import { combineReducers } from 'redux';
import {
  registerUserReducer,
  loginUserReducer,
  userTokenReducer,
  logoutUserReducer,
} from './user';

export const reducers = combineReducers({
  register: registerUserReducer,
  login: loginUserReducer,
  logout: logoutUserReducer,
  userToken: userTokenReducer,
});
