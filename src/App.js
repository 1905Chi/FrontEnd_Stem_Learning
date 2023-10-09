import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import DefaultLayoutLogin from './layouts/DefaultLayoutLogin';
import { publicRoutes, privateRoutes, notFoundRoute } from './routes/index';
import { useEffect } from 'react';

export default function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('token') ? true : false
  );

  const Page404 = notFoundRoute.component;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {' '}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayoutLogin setIsLogin={setIsLogin}>
                    <Page />
                  </DefaultLayoutLogin>
                }
              />
            );
          })}
          ,{' '}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLogin ? (
                    <DefaultLayout setIsLogin={setIsLogin}>
                      <Page />
                    </DefaultLayout>
                  ) : (
                    <Navigate
                      to="/login
                            "
                    />
                  )
                }
              />
            );
          })}
          ,{' '}
          {(notFoundRoute) => {
            return (
              <Route
                key={notFoundRoute.path}
                path={notFoundRoute.path}
                element={
                  <DefaultLayout>
                    <Page404 />
                  </DefaultLayout>
                }
              />
            );
          }}
          ,{' '}
        </Routes>{' '}
      </div>{' '}
    </BrowserRouter>
  );
}
