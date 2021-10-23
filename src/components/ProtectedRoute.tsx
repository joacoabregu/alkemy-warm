import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { login, logout } from "../state/loginSlice";
import { RootState } from "../state/store";

interface Props extends Omit<RouteProps, "component"> {
  component: React.ElementType;
}

export default function ProtectedRoute({
  component: Component,
  ...restOfProps
}: Props) {
  const isAuthenticated = localStorage.getItem("loggedUser");

  let loggedUser = useSelector((state: RootState) => state.user.user);
  let dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      if (!isAuthenticated) {
        dispatch(logout());
      } else {
        dispatch(login());
      }
    }
  }, [loggedUser, dispatch, isAuthenticated]);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
