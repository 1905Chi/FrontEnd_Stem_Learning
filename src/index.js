import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { WebSocketProvider } from './context/WebSocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebSocketProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </WebSocketProvider>
  </React.StrictMode>
);

reportWebVitals();
