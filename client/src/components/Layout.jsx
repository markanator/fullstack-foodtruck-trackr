/* eslint-disable react/prop-types */
import React from 'react';
import Header from './Layoutcomponents/Header';
import Footer from './Layoutcomponents/Footer';

export default function Layout({ children }) {
  return (
    <div id="App">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
