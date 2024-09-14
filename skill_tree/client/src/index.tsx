import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppContextProvider from './context/AppContext';
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error("REACT_APP_GOOGLE_CLIENT_ID is not defined in environment variables");
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
    
    <AppContextProvider>

    <App /> 
    </AppContextProvider>
  </GoogleOAuthProvider>
  </BrowserRouter>
  );

