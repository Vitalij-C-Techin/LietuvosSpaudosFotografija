import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../config/Config';

const AuthContext = createContext();

const setStorageToken = (token) => {
  if (!!!token) {
    return;
  }

  localStorage.setItem('user_token', token);
};

const getStorageToken = () => {
  return localStorage.getItem('user_token');
};

const unsetStorageToken = () => {
  localStorage.removeItem('user_token');
};

const setStorageUserData = (userData) => {
  if (!!!userData) {
    return;
  }

  localStorage.setItem('user_data', JSON.stringify(userData));
};

const getStorageUserData = () => {
  const u = localStorage.getItem('user_data');

  if (!!!u) {
    return null;
  }

  return JSON.parse(u);
};

const unsetStorageUserData = () => {
  localStorage.removeItem('user_data');
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStorageToken() || null);
  const [userData, setUserData] = useState(getStorageUserData() || null);

  window.userData = {
    token,
    userData
  };

  const getToken = () => {
    return token;
  };

  const unsetToken = () => {
    setToken(null);
  };

  const getUserData = () => {
    return userData;
  };

  const unsetUserData = () => {
    setUserData(null);
  };

  /* --- */

  const isLoggedIn = () => {
    return !!token && !!userData;
  };

  const getTokenHeader = () => {
    if (!isLoggedIn()) {
      return null;
    }

    return {
      Authorization: `Bearer ${token}`
    };
  };

  const getRole = () => {
    if (!!isLoggedIn()) {
      return null;
    }

    return userData.role;
  };

  /* --- */

  const setUser = (data) => {
    if (!!!data) {
      return;
    }

    if (!!!data.token) {
      return;
    }

    if (!!!data.user) {
      return;
    }

    setToken(data.token);
    setStorageToken(data.token);

    setUserData(data.user);
    setStorageUserData(data.user);
  };

  const login = async (email, password, callbacks) => {
    return;

    axios
      .post(Config.endpoints.login, {
        email,
        password
      })
      .then((response) => {
        console.log(response);

        if (!!!response) {
          return;
        }

        if (!!!response.token) {
          return;
        }

        if (!!!response.user) {
          return;
        }

        setUser(response);
      })
      .catch((error) => {})
      .finally(() => {});
  };

  const logout = () => {
    unsetToken();
    unsetStorageToken();

    unsetUserData();
    unsetStorageUserData();
  };

  return (
    <AuthContext.Provider
      value={{
        getToken,
        getTokenHeader,
        isLoggedIn,
        getUserData,
        getRole,
        setUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
