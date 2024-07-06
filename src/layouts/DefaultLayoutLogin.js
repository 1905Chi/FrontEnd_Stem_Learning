import React from "react";
import { Route, Redirect } from 'react-router-dom';
export default function DefaultLayoutLogin({ children }) {
  const isAuthenticated = !!localStorage.getItem('user');
  return (
    <div style={{ overflowY: 'auto', height: '100vh' }}>
      {React.cloneElement(children)}
    </div>
  );
}
