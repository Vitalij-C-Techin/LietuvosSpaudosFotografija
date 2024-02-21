import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const Authorization = ({ allowedRoles, callbackOnDeny }) => {
  const { isLoggedIn, getRole, getUserData } = useAuth();

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
