import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useGetSelfQuery } from "../RQ/query/useGetSelfQuery";
import { useUser } from "~/lib/auth";
const PrivateRoute = ({ children, ...rest }) => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  return (
    <Route
      {...rest}
      render={() =>
        // if token, render component
        localStorage.getItem("token") && user?.id !== null ? (
          children
        ) : (
          // If NOT logged in, redirect
          <Navigate replace to="/403" />
        )
      }
    />
  );
};

export default PrivateRoute;
