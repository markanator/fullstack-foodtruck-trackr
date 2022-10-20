/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
// import { useQueryClient } from 'react-query';
import { Route, Redirect } from "react-router-dom";
import { useGetSelfQuery } from "../RQ/query/useGetSelfQuery";
const PrivateRoute = ({ children, ...rest }) => {
  const { data: user, isLoading } = useGetSelfQuery();

  if (isLoading) return <div>Loading...</div>;
  return (
    <Route
      {...rest}
      render={() =>
        // if token, render component
        localStorage.getItem("token") && user !== null ? (
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
