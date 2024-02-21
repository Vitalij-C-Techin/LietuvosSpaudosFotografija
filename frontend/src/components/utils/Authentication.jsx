import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Authentication = ({ isLoggedExpected = true, children, callbackOnDeny }) => {
  const { isLoggedIn } = useAuth();

  return;

  if (isLoggedIn() === !!isLoggedExpected) {
    return children;
  }

  if (!!callbackOnDeny && typeof callbackOnDeny === 'function') {
    return callbackOnDeny();
  }

  return <Navigate to="/error" />;
};

export const IsAuthenticated = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? children : false;
};

export const IsAuthenticatedWithRole = ({ children, allowedRoles }) => {
  const { isLoggedIn, getRole } = useAuth();

  if (!isLoggedIn()) {
    return;
  }

  if (!allowedRoles.includes(getRole())) {
    return;
  }

  return children;
};

export const IsNotAuthenticated = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return !isLoggedIn() ? children : false;
};
