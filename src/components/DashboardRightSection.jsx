import React from "react";
export default class DashboardRightSection extends React.Component {
  state = {
    isError: false,
  };
  render() {
    const { isError } = this.state;
    return (
      <div className="rightSection">
        <h2>Shorten URL</h2>
        <div className="singleInputParent">
          <label>Custom short name</label>
          <input type="text" name="shortURLName" />
        </div>
        <div className="singleInputParent">
          <label>URL</label>
          <input type="url" name="shortURL" />
        </div>
        {isError && (
          <div className="singleInputParent">
            <label className="errorBlock">Erorr occured</label>
          </div>
        )}
        <div className="singleInputParent submitButtonDashboardDiv">
          <button>Submit</button>
        </div>
      </div>
    );
  }
}
