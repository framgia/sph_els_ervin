import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { reducers } from '../reducers/index';
import thunk from 'redux-thunk';
const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
