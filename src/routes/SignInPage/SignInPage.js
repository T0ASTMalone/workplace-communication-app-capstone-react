import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SignInPage.css";
import SignInForm from "../../components/SignInForm/SignInForm";

export default class SignInPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = (wp, userId) => {
    const { location, history } = this.props;
    const destination =
      (location.state || {}).from || `/workplace/${wp}/${userId}`;
    history.push(destination);
  };

  render() {
    const search = new URLSearchParams(this.props.location.search);

    return (
      <div className="sign-in-page">
        <div className="sign-in-container">
          <SignInForm
            onLoginSuccess={this.handleLoginSuccess}
            user={search.get("u")}
            pass={search.get("p")}
          />
        </div>
      </div>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};
