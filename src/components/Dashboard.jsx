import React from "react";
import DashboardHeader from "./DashboardHeader";
import "../styles/DashboardStyles.css";
import DashboardLeftSection from "./DashboardLeftSection";
import DashboardRightSection from "./DashboardRightSection";
import FooterComponent from "./FooterComponent";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboardContainer">
        <DashboardHeader />
        <div className="dashboardContainerFlex">
          <DashboardLeftSection />
          <DashboardRightSection />
        </div>
        <FooterComponent />
      </div>
    );
  }
}
