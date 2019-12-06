import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EmployerRegistrationForm extends Component {
  render() {
    return (
      <div className="employer-registration">
        <form action="" className="employee-registration-form">
          {/* user name */}
          <label htmlFor="employer-name">User Name</label>
          <input id="employer-name" type="text" className="new-employer" />
          <label htmlFor="company-name">Company Name</label>
          {/* project name */}
          <input id="company-name" type="text" className="new-employer" />
          <label htmlFor="password">Password</label>
          {/* password */}
          <input id="password" type="text" className="new-employer" />
          <label htmlFor="password-confirm">Confirm Password</label>
          {/* confirm password */}
          <input id="password-confirm" type="text" className="new-employer" />
          <button className="registration-button">Register</button>
          <Link to={"/sign-in"}>
            <button className="registration-button">Sign In</button>
          </Link>
        </form>
      </div>
    );
  }
}
