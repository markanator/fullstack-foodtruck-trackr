import React from 'react';
import ReactDOM from 'react-dom';
// local
import App from './App';
import './styles/index.css';

// render to page
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
