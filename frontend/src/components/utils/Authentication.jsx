import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Authentication = ({ isLoggedIn = true, children, callbackOnDeny }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn() === !!isLoggedIn) {
    return children;
  }

  if (!!callbackOnError && typeof callbackOnError === 'function') {
    return callbackOnDeny();
  }

  return <Navigate to="/error" />;
};

export default Authentication;
