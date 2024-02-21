import Config from '../config/Config';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const loginRequest = (d) => {
  console.log('Login request:', d);
  axios.post(Config.endpoints.auth.login, d.data).then(d.then).catch(d.catch).finally(d.finally);
};

export const registerRequest = (d) => {
  axios
    .post(Config.endpoints.auth.registration, d.data)
    .then(d.then)
    .catch(d.catch)
    .finally(d.finally);
};

export const userByUuidRequest = (d) => {
  const [getTokenHeader] = useAuth();

  const link = Config.endpoints.user.byUuid.replace('{uuid}', d.uuid);

  axios.post(link, false, getTokenHeader()).then(d.then).catch(d.catch).finally(d.finally);
};
