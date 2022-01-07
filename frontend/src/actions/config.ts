// export const config = {
//   URL: 'https://ervin-els-backend.herokuapp.com/api',
// };

export const config = {
  URL:
    process.env.REACT_APP_ENV === 'local'
      ? '127.0.0.1:8000/api'
      : 'https://ervin-els-backend.herokuapp.com/api',
};
