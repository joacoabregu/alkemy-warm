import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";


interface Props extends Omit<RouteProps, "component"> {
  component: React.ElementType;
}

export default function ProtectedRoute({ component: Component }: Props) {
  const isAuthenticated = localStorage.getItem("loggedUser");
  console.log("this", isAuthenticated);

  return (
    <Route
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
