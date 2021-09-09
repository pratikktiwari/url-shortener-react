import React from "react";
export default class FooterComponent extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          width: "100%",
        }}
      >
        <p>
          Developed by: <a href="https://pratiktiwari.com"> Pratik K Tiwari</a>
        </p>
        <div>&hearts;</div>
      </div>
    );
  }
}
