import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default class Header extends Component {
  renderLogoutLink(signOut) {
    let loggedIn = false;
    let location = this.props.location.pathname || null;
    console.log(location);
    return (
      <div className="header-logged-in">
        {location === "/" && loggedIn ? (
          <button
            className="to-dash"
            onClick={() => this.props.history.goBack()}
          >
            Back to Dashboard ->
          </button>
        ) : (
          <Link className="login-out" onClick={signOut} to="/">
            Sign out
          </Link>
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
                WorkPlace
              </Link>
            </h1>
          </div>
          {this.renderLogoutLink()}
        </nav>
      </>
    );
  }
}
