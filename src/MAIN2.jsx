import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './APP2';
import './INDEX2.css';
import { AuthProvider } from './CONTEXTS2/AUTHCONTEXT2/AUTHCONTEXT2.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
