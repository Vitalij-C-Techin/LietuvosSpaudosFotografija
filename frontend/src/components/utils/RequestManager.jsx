import axios from 'axios';

import Config from '../config/Config';

export const loginRequest = (args) => {
  const url = Config.apiDomain + Config.endpoints.auth.login;

  axios.post(url, args.data).then(args.then).catch(args.catch).finally(args.finally);
};

export const registerRequest = (args) => {
  const url = Config.apiDomain + Config.endpoints.auth.registration;

  axios.post(url, args.data).then(args.then).catch(args.catch).finally(args.finally);
};

//REMOVE IT LATTER