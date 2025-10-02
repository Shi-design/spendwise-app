import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// at bottom of src/index.js (or right after ReactDOM.render)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service worker registered: ', reg.scope))
      .catch(err => console.log('Service worker registration failed: ', err));
  });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);