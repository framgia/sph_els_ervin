export const url =
  process.env.REACT_APP_ENV === 'local'
    ? '127.0.0.1:8000/api'
    : 'https://ervin-els-backend.herokuapp.com/api';
