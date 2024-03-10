import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UserManagement = ({ requiredRole, children }) => {
  const { getUserData } = useAuth();
  const userData = getUserData();

  if (!userData || userData.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  return children;
};
export default UserManagement;
