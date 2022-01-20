let BASE_URL;

switch (process.env.REACT_APP_ENV) {
  case 'local':
    BASE_URL = 'http://127.0.0.1:8000';
    break;
  case 'ngrok':
    BASE_URL = 'http://fdac-49-145-101-111.ngrok.io';
    break;
  default:
    BASE_URL = 'https://ervin-els-backend.herokuapp.com';
}

export const config = {
  BASE_URL,
  URL: `${BASE_URL}/api`,
  IMG_URL: BASE_URL,
};
