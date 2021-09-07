import React from "react";
export default class SignUpPage extends React.Component {
  state = {
    isError: false,
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
        <div className="singleInputParent">
          <label>Retype Password</label>
          <input type="text" name="password" />
        </div>
        {isError && (
          <div className="singleInputParent">
            <label className="errorBlock">Erorr occured</label>
          </div>
        )}
        <div className="singleInputParent">
          <button>Create Accout</button>
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
