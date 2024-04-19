import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './components/CSS/index.css';

const root = document.getElementById('root');
createRoot(root).render(<App />);