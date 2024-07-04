// AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import authReducer, { initialState } from './authReducer';

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Fetch user data or verify token if needed
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          accessToken,
          // You can add other data here if needed
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
