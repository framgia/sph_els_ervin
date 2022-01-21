interface ENV {
  [key: string]: string;
}

const env_url: ENV = {
  local: process.env.REACT_APP_LOCAL!,
  ngrok: process.env.REACT_APP_NGROK!,
  production: process.env.REACT_APP_HEROKU!,
};

const BASE_URL = env_url[process.env.REACT_APP_ENV!];

export const config = {
  BASE_URL,
  URL: `${BASE_URL}/api`,
  IMG_URL: BASE_URL,
};
