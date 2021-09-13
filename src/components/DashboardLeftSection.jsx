import React from "react";
import { Chart, registerables } from "chart.js";
import thinkingManImage from "../assets/thinking-man.png";
import loadingImage from "../assets/loadingBuffering.gif";
export default class DashboardLeftSection extends React.Component {
  state = {
    graphData: [],
    isDataLoaded: false,
  };
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    const { shortenerData } = this.props;
    if (
      prevProps.shortenerData !== shortenerData &&
      shortenerData &&
      shortenerData.length
    ) {
      const currentDateObj = new Date();
      const currentMonth = currentDateObj.getMonth() + 1;
      const currentYear = currentDateObj.getFullYear();
      const currentDate = currentDateObj.getDate();
      const releventData = [];
      const extractedData = {};
      shortenerData.forEach((item) => {
        const [year, month, date] = item.dateHit.split("-");
        if (
          item.dateHit &&
          Number(month) === currentMonth &&
          Number(year) === currentYear
        ) {
          extractedData[date] = item.totalVisits;
        }
      });
      for (let i = 1; i <= currentDate; i++) {
        if (extractedData[i]) {
          releventData.push(extractedData[i] - 0);
        } else {
          releventData.push(0);
        }
      }
      this.setState(
        {
          graphData: releventData,
          isDataLoaded: true,
        },
        () => {
          this.renderChart();
        }
      );
    }
  }
  render() {
    const { graphData, isDataLoaded } = this.state;
    return (
      <div className="leftSection">
        {graphData && graphData.length ? (
          <div
            style={{
              maxWidth: "80%",
              margin: "auto",
            }}
          >
            <canvas id="urlTrendGraph" width="100%"></canvas>
          </div>
        ) : (
          <div className="leftSectionNoURL">
            {isDataLoaded ? (
              <>
                <img
                  src={thinkingManImage}
                  alt="man thinking"
                  aria-label="You don't have any urls yet"
                />
                <h2>Opps !!!</h2>
                <h3>
                  Looks like you haven't shortened any URLs yet, or they haven't
                  received any hits.
                </h3>
              </>
            ) : (
              <>
                <img
                  src={loadingImage}
                  style={{ width: 70 }}
                  alt="loading"
                  aria-label="loading"
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  }
  renderChart = () => {
    const currentDay = new Date().getDate();
    Chart.register(...registerables);
    const ctx = document.getElementById("urlTrendGraph");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [...Array(currentDay).keys()],
        datasets: [
          {
            label: "# of Visits",
            data: this.state.graphData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
}
