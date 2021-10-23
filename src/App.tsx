import React from 'react';
import Header from "./components/Header";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
