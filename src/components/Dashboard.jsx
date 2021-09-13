import React from "react";
import DashboardHeader from "./DashboardHeader";
import "../styles/DashboardStyles.css";
import DashboardLeftSection from "./DashboardLeftSection";
import DashboardRightSection from "./DashboardRightSection";
import FooterComponent from "./FooterComponent";
import axios from "axios";
export default class Dashboard extends React.Component {
  state = {
    shortenerDataGraph: [],
    shortenerDataTable: [],
  };
  componentDidMount() {
    axios
      .post("https://shortener-url.azurewebsites.net/getURLRecords.php", {})
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData && responseData.result) {
            this.setState({
              shortenerDataGraph: responseData.result.resultDateGrouped,
              shortenerDataTable: responseData.result.resultCountGrouped,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderTableData = () => {
    return this.state.shortenerDataTable.map((linkItem, index) => (
      <tr key={index}>
        <td title={linkItem.shortName}>{linkItem.shortName}</td>
        <td title={linkItem.longURL}>{linkItem.longURL?.substring(0, 50)}</td>
        <td title={linkItem.totalVisits}>{linkItem.totalVisits}</td>
      </tr>
    ));
  };
  render() {
    const { shortenerDataGraph, shortenerDataTable } = this.state;
    return (
      <div className="dashboardContainer">
        <DashboardHeader />
        <div
          className="dashboardContainerFlex"
          style={shortenerDataTable.length ? { marginTop: 10 } : {}}
        >
          <DashboardLeftSection shortenerData={shortenerDataGraph} />
          <DashboardRightSection />
        </div>
        {shortenerDataTable && shortenerDataTable.length ? (
          <div className="tableDashboardDetails">
            <h2>Statistics</h2>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Total Visits</th>
                </tr>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
        <FooterComponent />
      </div>
    );
  }
}
