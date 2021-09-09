import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
          <Route path="/">
            <LoginSignupContainer/>
          </Route>
          <Route path="/login">
            <div>
              <h1>Hello world</h1>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}
