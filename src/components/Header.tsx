import React from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { logout } from "../state/loginSlice";
import { RootState } from "../state/store";

export default function Header() {
  let history = useHistory();
  let loggedUser = useSelector((state: RootState) => state.user.user);
  let dispatch = useDispatch();
  function logoutUser() {
    window.localStorage.removeItem("loggedUser");
    dispatch(logout());
    history.push("/login");
  }
  return (
    <Nav
      defaultActiveKey="/"
      as="ul"
      className="justify-content-between bg-light p-3 mb-5"
    >
      <div className="d-flex justify-content-between ">
        <Nav.Item as="li">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {!loggedUser && (
          <Nav.Item as="li">
            <LinkContainer to="/login">
              <Nav.Link eventKey="link-1">Login</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
      </div>
      {loggedUser && (
        <Button variant="primary" type="button" onClick={logoutUser}>
          Logout
        </Button>
      )}
    </Nav>
  );
}
