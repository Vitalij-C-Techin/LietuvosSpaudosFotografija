import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

//TODO wait for role implementation

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userRole, setUserRole] = useState(null);

  const login = async (email, password) => {
    try {
      // const response = await axios.post('http://localhost:8080/api/v1/login', { email, password });
      // const userData = response.data;
      // setUserRole(userData.role);
      setIsLoggedIn(true);
      
    } catch (error) {
      console.log('login failed', error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    // setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, /*userRole*/ }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
