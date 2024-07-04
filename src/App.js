import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext, useState, useEffect, useRef } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import DefaultLayoutLogin from './layouts/DefaultLayoutLogin';
import DefaultLayoutTwoPage from './layouts/DefaultLayoutTwoPage';
import {
  publicRoutes,
  privateRoutes,
  notFoundRoute,
  privateRoutes2page,
  private1page,
  publicRoutes2,
} from './routes/index';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import LandingPage from './pages/landing/LandingPage';
import { useWebSocket } from './context/WebSocketContext';
import { AuthContext } from "./pages/auth/login/AuthContext"; // Import AuthContext

export default function App() {
  const { state } = useContext(AuthContext); // Sử dụng context
  const { isLogin } = state;


  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isComponentUnmounted = useRef(false);
  const { connectWebSocket, disconnectWebSocket, notification } = useWebSocket();

  useEffect(() => {
    connectWebSocket(currentUser);
    return () => {
      if (!isComponentUnmounted.current) {
        disconnectWebSocket(currentUser);
      }
    };
  }, [currentUser]);

  const Page404 = notFoundRoute.component;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayoutLogin>
                    <Page />
                  </DefaultLayoutLogin>
                }
              />
            );
          })}
          ,
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const Left = route.Left;
            const Right = route.Right;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLogin ? (
                    <DefaultLayout Left={<Left />} Right={<Right />}>
                      <Page />
                    </DefaultLayout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}
          ,
          {privateRoutes2page.map((route, index) => {
            const Page = route.component;
            const Left = route.Left;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLogin ? (
                    <DefaultLayoutTwoPage Left={<Left />}>
                      <Page />
                    </DefaultLayoutTwoPage>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}
          ,
          {publicRoutes2.map((route, index) => {
            const Page = route.component;
            const Left = route.Left;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayoutTwoPage Left={<Left />}>
                    <Page />
                  </DefaultLayoutTwoPage>
                }
              />
            );
          })}
          ,
          {private1page.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLogin ? (
                    <DefaultLayoutLogin >
                      <Page />
                    </DefaultLayoutLogin>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}
          ,
          <Route
            key={notFoundRoute.path}
            path={notFoundRoute.path}
            element={
              <>
                <Topbar />
                <DefaultLayoutLogin>
                  <LandingPage />
                </DefaultLayoutLogin>
                <Footer />
              </>
            }
          />
          ,
        </Routes>
      </div>
    </BrowserRouter>
  );
}
