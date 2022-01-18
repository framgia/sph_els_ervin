import axios from 'axios';
import { config } from '../actions/config';

const { token } = JSON.parse(localStorage.getItem('SessionData' || '') || '');

const API = axios.create({
  baseURL: `${config.URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default API;
