import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const placesCount = 5;
root.render(
  <React.StrictMode>
    <App placesCount={placesCount} />
  </React.StrictMode>
);
