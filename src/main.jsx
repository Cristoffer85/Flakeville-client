import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';
import { AuthProvider } from './contexts/authcontext/authcontext.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
