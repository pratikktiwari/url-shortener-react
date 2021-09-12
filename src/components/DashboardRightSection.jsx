import React from "react";
import Constants from "./Constants";
import axios from "axios";
export default class DashboardRightSection extends React.Component {
  state = {
    isError: false,
    shortName: "",
    longURL: "",
    errorMessage: "Some error occured",
    urlCreated: false,
  };
  onInputValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      signUpFailed: false,
    });
  };
  checkURL = async () => {
    const { shortName, longURL } = this.state;
    if (!shortName || !longURL) {
      this.setState({
        isError: true,
        errorMessage: Constants.shortURLInputValidationMessage,
      });
      return;
    }
    await axios
      .post("https://shortener-url.azurewebsites.net/addURL.php", {
        shortName: shortName,
        longURL: longURL,
      })
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.result === "addURLSuccess") {
            this.setState({
              urlCreated: true,
            });
          } else if (responseData.result === "duplicateShortName") {
            this.setState({
              isError: true,
              errorMessage: Constants.duplicateShortName,
            });
          } else {
            this.setState({
              isError: true,
              signupErrorMessage: Constants.commonErrorMessage,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { isError, shortName, longURL, errorMessage } = this.state;
    return (
      <div className="rightSection">
        <h2>Shorten URL</h2>
        <div className="singleInputParent">
          <label>Custom short name</label>
          <input
            type="text"
            name="shortName"
            value={shortName}
            onChange={this.onInputValueChange}
          />
        </div>
        <div className="singleInputParent">
          <label>URL</label>
          <input
            type="url"
            name="longURL"
            value={longURL}
            onChange={this.onInputValueChange}
          />
        </div>
        {isError && (
          <div className="singleInputParent">
            <label className="errorBlock">{errorMessage}</label>
          </div>
        )}
        <div className="singleInputParent submitButtonDashboardDiv">
          <button onClick={this.checkURL}>Submit</button>
        </div>
      </div>
    );
  }
}
