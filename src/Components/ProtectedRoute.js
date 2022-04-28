import React, { useState, useContext, useEffect, lazy, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [status, setStatus] = useState("onLoad");
  const { getSession, logout } = useContext(AuthContext);

  useEffect(() => {
    getSession()
      .then(() => {
        setStatus(true);
      })
      .catch(() => {
        setStatus(false);
      });
  }, []);

  if (status === "onLoad") {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        status === true ? (
          <Component {...props} logout={logout} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
