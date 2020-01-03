import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import "./Header.css";
import TokenService from "../../Services/token-service";
import IdleService from "../../Services/idle-service";

export default class Header extends Component {
  static contextType = WorkPlaceContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  // renderLogoutLink(signOut) {
  //   let location = this.props.location.pathname || null;
  //   let { workPlace, nickname } = this.context;
  //   let path = `workplace/${workPlace}/${nickname}`;
  //   return (
  //     <div className="header-logged-in">
  //       {location === "/" ||
  //       location === "/create" ||
  //       location === "/join" ||
  //       location === "/sign-in" ? (
  //         <button
  //           className="to-dash"
  //           onClick={() => this.props.history.push(path)}
  //         >
  //           Back to WorkPlace
  //         </button>
  //       ) : (
  //         <button onClick={() => this.signOut()}>Sign Out</button>
  //       )}
  //     </div>
  //   );
  // }

  renderLogoutLink(signOut) {
    let { workPlace, userId } = this.context;
    let path = `/workplace/${workPlace}/${userId}`;
    return (
      <div className="Header__logged-in">
        {this.props.location.pathname !== `${path}` &&
        TokenService.hasAuthToken() ? (
          <button
            className="to-dash"
            onClick={() => this.props.history.push(path)}
          >
            Back to WorkPlace
          </button>
        ) : (
          <Link className="login-out" onClick={signOut} to="/">
            Sign out
          </Link>
        )}
      </div>
    );
  }

  signOut = () => {
    this.context.setLogged(false);
    this.props.history.push("/");
  };

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
