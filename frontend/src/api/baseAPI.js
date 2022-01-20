import axios from 'axios';
import { config } from '../actions/config';
import Cookies from 'js-cookie';

const token = Cookies.get('user_token');

const API = axios.create({
  baseURL: `${config.URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default API;
