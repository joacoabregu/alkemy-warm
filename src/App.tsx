import React from "react";
import Header from "./components/Header";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/detalle/edit/:id" component={EditPost} />
        <ProtectedRoute path="/detalle/:id" component={Post} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
