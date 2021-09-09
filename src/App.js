import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginSignupContainer from "./components/LoginSignupContainer";
export default class App extends React.Component {
  /**
   * Checks if user is logged in from cookies
   * @returns void
   */
  checkLoggedInUser = () => {
    const cookieKey = "userEmail";
    const match = document.cookie.match(
      new RegExp("(^| )" + cookieKey + "=([^;]+)")
    );
    if (match && match.length && match[2] !== "null") {
      sessionStorage.setItem("userEmail", match[2]);
      return true;
    }
    return false;
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <LoginSignupContainer/> */}
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <LoginSignupContainer />
          </Route>
          <Route exact path="/signup">
            <LoginSignupContainer />
          </Route>
          <Route exact path="/home">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    );
  }
}
