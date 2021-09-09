import { Icon } from "@fluentui/react";
import React from "react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import globeImage from "../assets/globe.png";
//Initialize fluent UI icons from CDN
initializeIcons();
export default class DashboardHeader extends React.Component {
  state = {
    userEmailAlias: "",
  };
  componentDidMount() {
    //remove when fetching from session
    window["currentUserAlias"] = "pratik@gmail.com";
    //set current user alias
    const loggedInUserAlias = window["currentUserAlias"]?.split("@")?.[0];
    this.setState({
      userEmailAlias: loggedInUserAlias,
    });
  }
  render() {
    const { userEmailAlias } = this.state;
    return (
      <nav className="topNav">
        <ul>
          <li className="headerImageLogo">
            <img
              src={globeImage}
              alt="url shortener logo"
              aria-label="url shortener logo"
            />
          </li>
          <li className="welcomeTextDashboard">Welcome {userEmailAlias}</li>
          <li className="logoutButtonHeader">
            <Icon iconName="PowerButton" />
          </li>
        </ul>
      </nav>
    );
  }
}
