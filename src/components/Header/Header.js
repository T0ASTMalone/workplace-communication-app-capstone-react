import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import "./Header.css";

export default class Header extends Component {
  static contextType = WorkPlaceContext;

  renderLogoutLink(signOut) {
    let location = this.props.location.pathname || null;
    let { workPlace, nickname } = this.context;
    let path = `workplace/${workPlace}/${nickname}`;
    return (
      <div className="header-logged-in">
        {location === "/" ||
        location === "/create" ||
        location === "/join" ||
        location === "/sign-in" ? (
          <button
            className="to-dash"
            onClick={() => this.props.history.push(path)}
          >
            Back to WorkPlace
          </button>
        ) : (
          <button onClick={() => this.signOut()}>Sign Out</button>
        )}
      </div>
    );
  }

  signOut = () => {
    this.context.setLogged(false);
    this.props.history.push("/");
  };

  render() {
    let logged = this.context.logged;
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
          {logged ? this.renderLogoutLink(this.signOut) : <></>}
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
