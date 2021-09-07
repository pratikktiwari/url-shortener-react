import React from "react";
export default class LoginPage extends React.Component {
  state = {
    isError: true,
  };
  render() {
    const { isError } = this.state;
    return (
      <>
        <div className="singleInputParent">
          <label>Email</label>
          <input type="text" name="email" />
        </div>
        <div className="singleInputParent">
          <label>Password</label>
          <input type="text" name="password" />
        </div>
        {isError && (
          <div className="singleInputParent">
            <label className="errorBlock">Erorr occured</label>
          </div>
        )}
        <div className="singleInputParent">
          <button>Sign In</button>
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
