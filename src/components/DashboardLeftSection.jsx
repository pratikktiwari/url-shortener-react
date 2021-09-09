import React from "react";
import thinkingManImage from "../assets/thinking-man.png";
export default class DashboardLeftSection extends React.Component {
  render() {
    return (
      <div className="leftSection">
        <div className="leftSectionNoURL">
          <img
            src={thinkingManImage}
            alt="man thinking"
            aria-label="You don't have any urls yet"
          />
          <h2>Opps !!!</h2>
          <h3>Looks like you havn't shortened any URLs yet.</h3>
        </div>
      </div>
    );
  }
}
