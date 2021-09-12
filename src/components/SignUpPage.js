import React from "react";
import axios from "axios";
import Constants from "./Constants";
export default class SignUpPage extends React.Component {
  state = {
    userEmail: "test@test.com",
    password: "test",
    passwordConfirm: "test",
    signUpFailed: false,
    signUpErrorMessage: "",
    signUpSuccess: false,
  };
  onInputValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      signUpFailed: false,
    });
  };
  checkLogin = async () => {
    const { userEmail, password, userName, passwordConfirm } = this.state;
    if (
      !userEmail ||
      !password ||
      !passwordConfirm ||
      password !== passwordConfirm
    ) {
      this.setState({
        signUpFailed: true,
        signupErrorMessage:
          password !== passwordConfirm
            ? Constants.noPasswordMatch
            : Constants.validationFailed,
      });
      return;
    }
    await axios
      .post("https://shortener-url.azurewebsites.net/signup.php", {
        userName: userName,
        userEmail: userEmail,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.result === "signUpSuccess") {
            this.setState({
              signUpSuccess: true,
            });
            setTimeout(() => {
              window.location.href = "/login";
            }, 3000);
          } else if (responseData.result === "duplicateEmail") {
            this.setState({
              signUpFailed: true,
              signupErrorMessage: Constants.duplicateEmail,
            });
          } else {
            this.setState({
              signUpFailed: true,
              signupErrorMessage: Constants.signUpFailed,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const {
      userEmail,
      passwordConfirm,
      password,
      signUpFailed,
      signupErrorMessage,
      signUpSuccess,
    } = this.state;
    return (
      <>
        <div className="singleInputParent">
          <label>Email</label>
          <input
            type="text"
            name="userEmail"
            value={userEmail}
            onChange={this.onInputValueChange}
          />
        </div>
        <div className="singleInputParent">
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={this.onInputValueChange}
          />
        </div>
        <div className="singleInputParent">
          <label>Retype Password</label>
          <input
            type="text"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={this.onInputValueChange}
          />
        </div>
        {signUpFailed && (
          <div className="singleInputParent">
            <label className="errorBlock">{signupErrorMessage}</label>
          </div>
        )}
        {signUpSuccess && (
          <div className="singleInputParent">
            <label className="successBlock">
              Account created. Redirecting ...
            </label>
          </div>
        )}
        <div className="singleInputParent">
          <button onClick={this.checkLogin}>Create Accout</button>
        </div>
        <div className="singleInputParent">
          <p>
            Already have an account?{" "}
            <strong onClick={() => this.props.toggleLoginSignUp()}>
              Login In
            </strong>
          </p>
        </div>
      </>
    );
  }
}
