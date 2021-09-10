import React from "react";
import DashboardHeader from "./DashboardHeader";
import "../styles/DashboardStyles.css";
import DashboardLeftSection from "./DashboardLeftSection";
import DashboardRightSection from "./DashboardRightSection";
import FooterComponent from "./FooterComponent";

export default class Dashboard extends React.Component {
  state = {
    shortenerData: [],
  };
  componentDidMount() {
    this.setState({
      shortenerData: dummyData,
    });
  }
  renderTableData = () => {
    return this.state.shortenerData.map((linkItem, index) => (
      <tr key={index}>
        <td title={linkItem.name}>{linkItem.name}</td>
        <td title={linkItem.url}>{linkItem.url?.substring(0, 50)}</td>
        <td title={linkItem.visitCount}>{linkItem.visitCount}</td>
        <td title={linkItem.locations}>{linkItem.locations?.join(", ")}</td>
      </tr>
    ));
  };
  render() {
    const { shortenerData } = this.state;
    return (
      <div className="dashboardContainer">
        <DashboardHeader />
        <div
          className="dashboardContainerFlex"
          style={shortenerData.length ? { marginTop: 10 } : {}}
        >
          <DashboardLeftSection shortenerData={shortenerData} />
          <DashboardRightSection />
        </div>
        {shortenerData && shortenerData.length ? (
          <div className="tableDashboardDetails">
            <h2>Statistics</h2>
            <table>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Total Visits</th>
                <th>Location</th>
              </tr>
              {this.renderTableData()}
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
const dummyData = [
  {
    name: "gmail",
    url: "https://mail.google.com",
    visitCount: 24,
    locations: ["ranchi", "jalandhar", "punjab"],
  },
  {
    name: "azure",
    url: "https://portal.azure.com",
    visitCount: 4,
    locations: ["ranchi", "jalandhar", "punjab"],
  },
  {
    name: "image_link",
    url: "https://www.google.com/search?q=table+style&sxsrf=AOaemvKvyPliNm33Ue3QZNtl3lS9YnHCbw:1631240155878&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjO4KKQq_PyAhUjILcAHQrSArcQ_AUoAXoECAEQAw&biw=1536&bih=754&dpr=1.25#imgrc=FndcDSbGkTn8hM",
    visitCount: 0,
    locations: ["ranchi", "jalandhar", "punjab"],
  },
  {
    name: "gmail",
    url: "https://mail.google.com",
    visitCount: 12322,
    locations: ["ranchi", "jalandhar", "punjab"],
  },
];
