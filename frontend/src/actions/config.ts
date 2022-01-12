export const config = {
  BASE_URL:
    process.env.REACT_APP_ENV === 'local'
      ? 'http://127.0.0.1:8000'
      : 'https://ervin-els-backend.herokuapp.com',
  URL:
    process.env.REACT_APP_ENV === 'local'
      ? 'http://127.0.0.1:8000/api'
      : 'https://ervin-els-backend.herokuapp.com/api',
  IMG_URL:
    process.env.REACT_APP_ENV === 'local'
      ? 'http://127.0.0.1:8000'
      : 'https://ervin-els-backend.herokuapp.com',
};
