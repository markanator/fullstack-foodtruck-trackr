import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
// local
import App from './App';
import './styles/index.css';

console.log(window.location);
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

// render to page
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Router>
      <App />
    </Router>
  </ChakraProvider>,
  document.getElementById('root')
);
