import { combineReducers } from 'redux';
import {
  registerUserReducer,
  loginUserReducer,
  UserTokenReducer,
} from './user';

export const reducers = combineReducers({
  register: registerUserReducer,
  login: loginUserReducer,
  userToken: UserTokenReducer,
});
