import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../../../shared/style/_variables';
import '../../../shared/style/reset';
import '../style/_reset.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
