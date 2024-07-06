import React, { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import DefaultLayoutLogin from './layouts/DefaultLayoutLogin';
import DefaultLayoutTwoPage from './layouts/DefaultLayoutTwoPage';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import LandingPage from './pages/landing/LandingPage';
import { useWebSocket } from './context/WebSocketContext'; // Kiểm tra cách WebSocketContext đã import

import {
  publicRoutes,
  privateRoutes,
  notFoundRoute,
  privateRoutes2page,
  private1page,
  publicRoutes2,
} from './routes/index';

export default function App() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isComponentUnmounted = useRef(false);
  const { connectWebSocket, disconnectWebSocket } = useWebSocket(); // Kiểm tra connectWebSocket và disconnectWebSocket từ context WebSocket

  useEffect(() => {
    connectWebSocket(currentUser); // Kết nối WebSocket khi component được mount
    return () => {
      if (!isComponentUnmounted.current) {
        disconnectWebSocket(currentUser); // Ngắt kết nối WebSocket khi component bị unmount
      }
    };
  }, [currentUser]);

  return (
    <Router>
      
      <div className="App">
        <Routes>
          {/* Các route public */}
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              restricted={true}
              path={route.path}
              element={
                <DefaultLayoutLogin>
                  <route.component />
                </DefaultLayoutLogin>
              }
            />
          ))}

          {/* Các route private */}
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={       
                  <DefaultLayout Left={<route.Left />} Right={<route.Right />}>
                    <route.component />
                  </DefaultLayout>      
              }
            />
          ))}

          {/* Các route private 2 page */}
          {privateRoutes2page.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                (
                  <DefaultLayoutTwoPage Left={<route.Left />}>
                    <route.component />
                  </DefaultLayoutTwoPage>
                )
              }
            />
          ))}

          {/* Các route public 2 page */}
          {publicRoutes2.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayoutTwoPage Left={<route.Left />}>
                  <route.component />
                </DefaultLayoutTwoPage>
              }
            />
          ))}

          {/* Các route private 1 page */}
          {private1page.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                 (
                  <DefaultLayoutLogin>
                    <route.component />
                  </DefaultLayoutLogin>
                ) 
              }
            />
          ))}

          {/* Route 404 */}
          <Route
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
        </Routes>
      </div>
    
    </Router>
  );
}
