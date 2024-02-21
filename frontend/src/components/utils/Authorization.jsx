import { useAuth } from '../context/AuthContext';
import Permissions from '../config/Permissions';
import { Navigate, Outlet } from 'react-router-dom';

export const Authorization = ({ pagePermission }) => {
  const { isLoggedIn, getRole } = useAuth();
  const userPermission = Permissions[getRole()];

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  if (!!!userPermission) {
    return <Navigate to="/error" />;
  }

  if (!!!userPermission.includes(pegePermission)) {
    return <Navigate to="/error" />;
  }

  return <Outlet />;
};
