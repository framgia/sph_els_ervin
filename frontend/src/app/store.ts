import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { combinedReducers } from '../reducers/index';
import thunk from 'redux-thunk';
const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunk))
);
