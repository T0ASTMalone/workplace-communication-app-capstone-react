import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import "./Header.css";
import TokenService from "../../Services/token-service";
import IdleService from "../../Services/idle-service";

export default class Header extends Component {
  state = {
    wp: "",
    user: ""
  };
  static contextType = WorkPlaceContext;

  handleLogoutClick = () => {
    this.props.history.push("/");
    this.context.clearContext();
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  componentDidMount() {
    let { workPlace, userId } = this.context;
    this.setState({
      wp: workPlace,
      user: userId
    });
  }

  renderLogoutLink(signOut) {
    let { workPlace, userId } = this.context;
    let path = `/workplace/${workPlace}/${userId}`;
    return (
      <div className="Header__logged-in">
        {this.props.location.pathname !== `${path}` &&
        TokenService.hasAuthToken() ? (
          <button
            className="to-dash header-button"
            onClick={() => this.props.history.goBack()}
          >
            Back to Wp
          </button>
        ) : (
          <button
            className="login-out header-button"
            onClick={this.handleLogoutClick}
          >
            Sign out
          </button>
        )}
      </div>
    );
  }

  render() {
    return (
      <>
        <nav className="header">
          <div className="icon-name">
            <h1>
              <Link className="header-title" to="/">
                Wp
              </Link>
            </h1>
          </div>
          {TokenService.hasAuthToken() ? (
            this.renderLogoutLink(this.handleLogoutClick)
          ) : (
            <></>
          )}
        </nav>
      </>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
