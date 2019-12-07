import React, { Component } from "react";
import "./SignInPage.css";
import SignInForm from "../../components/SignInForm/SignInForm";

export default class SignInPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = (wp, userName) => {
    const { location, history } = this.props;
    const destination =
      (location.state || {}).from || `/workplace/${wp}/${userName}`;
    console.log(destination);
    history.push(destination);
  };

  render() {
    return (
      <div className="sign-in-page">
        <div className="sign-in-container">
          <SignInForm onLoginSuccess={this.handleLoginSuccess} />
        </div>
      </div>
    );
  }
}
