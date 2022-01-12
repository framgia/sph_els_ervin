import { combineReducers } from 'redux';
import {
  registerUserReducer,
  loginUserReducer,
  userTokenReducer,
  logoutUserReducer,
} from './auth';
import { followsReducer } from './follows';

export const reducers = combineReducers({
  register: registerUserReducer,
  login: loginUserReducer,
  logout: logoutUserReducer,
  userToken: userTokenReducer,
  follows: followsReducer,
});
