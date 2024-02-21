import { useAuth } from '../context/AuthContext';
import ErrorPage from '../pages/ErrorPage';

export const Authentication = ({ children, isLoggedExpected = true, callbackOnDeny }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn() === isLoggedExpected) {
    return children;
  }

  if (!!callbackOnDeny && typeof callbackOnDeny === 'function') {
    return callbackOnDeny();
  }

  return <ErrorPage />;
};

export const IsAuthenticated = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn()) {
    return;
  }

  return children;
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

  if (isLoggedIn()) {
    return;
  }

  return children;
};
