import React from "react";
import { Chart, registerables } from "chart.js";
import thinkingManImage from "../assets/thinking-man.png";
export default class DashboardLeftSection extends React.Component {
  state = {
    userData: [12, 19, 3, 5, 2, 3, 0, 0, 1],
  };
  componentDidMount() {
    this.renderChart();
  }
  render() {
    const { userData } = this.state;
    return (
      <div className="leftSection">
        {userData.length ? (
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
            <img
              src={thinkingManImage}
              alt="man thinking"
              aria-label="You don't have any urls yet"
            />
            <h2>Opps !!!</h2>
            <h3>Looks like you havn't shortened any URLs yet.</h3>
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
            data: this.state.userData,
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
