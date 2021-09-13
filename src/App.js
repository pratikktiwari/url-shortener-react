import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginSignupContainer from "./components/LoginSignupContainer";
export default class App extends React.Component {
  /**
   * Checks if user is logged in from cookies
   * @returns boolean
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
            {this.checkLoggedInUser() ? (
              <Dashboard />
            ) : (
              <LoginSignupContainer />
            )}
          </Route>
          <Route exact path="/login">
            <LoginSignupContainer />
          </Route>
          <Route exact path="/signup">
            <LoginSignupContainer />
          </Route>
          <Route exact path="/home">
            {this.checkLoggedInUser() ? (
              <Dashboard />
            ) : (
              <LoginSignupContainer />
            )}
          </Route>
          <Route>
            <ShortURLRecord />
          </Route>
        </Switch>
      </Router>
    );
  }
}
class ShortURLRecord extends React.Component {
  componentDidMount() {
    this.checkShortURLRecord();
  }
  render() {
    return <h1>Checking url...</h1>;
  }
  /**
   * Checks if short name is in database
   * @returns void
   */
  checkShortURLRecord = () => {
    const currentShortName = window.location.pathname.split("/")[1];
    if (!currentShortName) {
      window.location.href = "/";
      return;
    }
    axios
      .post("https://shortener-url.azurewebsites.net/getURLForShortName.php", {
        shortName: currentShortName,
      })
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          if (
            responseData &&
            responseData.result &&
            responseData.result !== "noSuchURL"
          ) {
            window.location.href = responseData.result.longURL;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
