import React from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import "../styles/LoginContainerStyles.css";
// import imageLeftHuman from "../assets/imageLeftHumanWithLaptop.jpg";
import FooterComponent from "./FooterComponent";
export default class LoginSignupContainer extends React.Component {
  state = {
    isSignUpPage: true,
  };
  toggleLoginSignUp = () => {
    this.setState({
      isSignUpPage: !this.state.isSignUpPage,
    });
  };
  render() {
    const { isSignUpPage } = this.state;
    return (
      <div className="mainContainerSignupLogin">
        <h1 className="topHeader">
          Hello there, <strong>{isSignUpPage ? "Create Account" : "Sign In" }</strong>
        </h1>
        <div className="containerFlex">
          <div className="leftParentContainer">
              {/* <img
                src={imageLeftHuman}
                alt="man with laptop"
                aria-label="man with laptop"
              /> */}
          </div>
          <div className="rightParentContainer">
            {isSignUpPage ? (
              <SignUpPage toggleLoginSignUp={this.toggleLoginSignUp} />
            ) : (
              <LoginPage toggleLoginSignUp={this.toggleLoginSignUp} />
            )}
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}
