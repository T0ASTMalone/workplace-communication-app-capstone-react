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

  handleLoginSuccess = id => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || `/user/${id}`;
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
