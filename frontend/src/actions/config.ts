const BASE_URL =
  process.env.REACT_APP_ENV === 'local'
    ? 'http://127.0.0.1:8000'
    : 'https://ervin-els-backend.herokuapp.com';

export const config = {
  BASE_URL,
  URL: `${BASE_URL}/api`,
  IMG_URL: BASE_URL,
};
