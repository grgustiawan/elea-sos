import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import axios from 'axios';

// axios.defaults.baseURL = 'https://sos-api.galihrakagustiawan.site/api';
axios.defaults.baseURL = 'http://localhost:6100/api';
axios.defaults.timeout = 10000;  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
