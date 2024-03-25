import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const Authorization = ({ allowedRoles, callbackOnDeny }) => {
  const { isLoggedIn, getRole } = useAuth();

  if (!isLoggedIn()) {
    if (!!callbackOnDeny && typeof callbackOnDeny === 'function') {
      return callbackOnDeny();
    }

    return <Navigate to={'/login'} />;
  }

  if (!allowedRoles.includes(getRole())) {
    if (!!callbackOnDeny && typeof callbackOnDeny === 'function') {
      return callbackOnDeny();
    }

    return <Navigate to={'/error'} />;
  }

  return <Outlet />;
};

export const IsLogged = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn()) {
    return;
  }

  return <Outlet />;
};

export const IsNotLogged = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn()) {
    return;
  }

  return <Outlet />;
};
