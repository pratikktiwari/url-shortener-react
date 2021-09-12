import React from "react";
import axios from "axios";
import Constants from "./Constants";
// import { TiDeleteOutline } from "react-icons/ti";
export default class LoginPage extends React.Component {
  state = {
    userEmail: "test@test.com",
    password: "test",
    loginFailed: false,
    loginErrorMessage: "",
  };
  onInputValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      loginFailed: false,
    });
  };
  setLoginCookie = () => {
    let date = new Date(Date.now() + 1000 * 86400e3);
    date = date.toUTCString();
    document.cookie = `userEmail=${this.state.userEmail}; expires=${date}`;
    window.location.href = "/home";
    sessionStorage.setItem("userEmail", this.state.userEmail);
  };
  checkLogin = async () => {
    const { userEmail, password } = this.state;
    if (!userEmail || !password) {
      this.setState({
        loginFailed: true,
        loginErrorMessage: Constants.validationFailed,
      });
      return;
    }
    await axios
      .post("http://localhost/url-shortener/login.php", {
        userEmail: userEmail,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.result === "loginSuccess") {
            this.setLoginCookie();
          } else {
            this.setState({
              loginFailed: true,
              loginErrorMessage: Constants.loginFailed,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { loginFailed, userEmail, password, loginErrorMessage } = this.state;
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
        {loginFailed && (
          <div className="singleInputParent">
            {/* <TiDeleteOutline /> */}
            <label className="errorBlock">{loginErrorMessage}</label>
          </div>
        )}
        <div className="singleInputParent">
          <button onClick={() => this.checkLogin()}>Sign In</button>
        </div>
        <div className="singleInputParent">
          <p>
            Don't have an account?{" "}
            <strong onClick={() => this.props.toggleLoginSignUp()}>
              Sign Up
            </strong>
          </p>
        </div>
      </>
    );
  }
}
