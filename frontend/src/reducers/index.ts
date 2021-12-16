import { combineReducers } from 'redux';
import { registerUserReducer } from './user';

export const reducers = combineReducers({
  register: registerUserReducer,
});
