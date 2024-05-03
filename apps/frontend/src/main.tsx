import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';


import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="has-background-white">
    <App />
    </div>
  </React.StrictMode>,
);
