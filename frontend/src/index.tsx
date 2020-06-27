import React from 'react';
import ReactDOM from 'react-dom';
import { CacheProvider } from 'rest-hooks';

import App from './App';
import './styles/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider>
      <App />
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
