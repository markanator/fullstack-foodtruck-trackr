/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { useQueryClient } from 'react-query';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');

  return (
    <Route
      {...rest}
      render={() =>
        // if token, render component
        localStorage.getItem('token') && user !== null ? (
          children
        ) : (
          // If NOT logged in, redirect
          <Redirect to="/403" />
        )
      }
    />
  );
};

export default PrivateRoute;
