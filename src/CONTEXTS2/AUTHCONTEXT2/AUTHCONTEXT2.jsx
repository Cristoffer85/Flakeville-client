import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return {
          isLoggedIn: true,
          username: decodedToken.username,
          role: decodedToken.roles,
          token: token,
        };
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return {
      isLoggedIn: false,
      username: null,
      role: null,
      token: null,
    };
  });

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem('jwtToken', token);
      setAuthState({
        isLoggedIn: true,
        username: decodedToken.username,
        role: decodedToken.roles,
        token: token,
      });
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setAuthState({
      isLoggedIn: false,
      username: null,
      role: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;