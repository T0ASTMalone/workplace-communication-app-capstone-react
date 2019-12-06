import React, { Component } from "react";
import "./EmployeeRegistrationForm.css";
import { Link } from "react-router-dom";

export default class EmployeeRegistrationForm extends Component {
  render() {
    return (
      <div className="employee-registration">
        <form action="" className="employee-registration-form">
          <legend htmlFor="employee-registration-form">Join a WorkPlace</legend>
          {/* employee name */}
          <label htmlFor="employee-name">User Name</label>
          <input id="employee-name" type="text" className="new-employee" />
          {/* employee password */}
          <label htmlFor="password">Password</label>
          <input id="password" type="text" className="new-employee" />
          {/* employee password confirm */}
          <label htmlFor="password-confirm">Confirm Password</label>
          <input id="password-confirm" type="text" className="new-employee" />

          {/* workplace code */}
          <label htmlFor="workplace-code">WorkPlace Code</label>
          <input id="workplace-code" type="number" className="new-employee" />
          <button className="registration-button">Register</button>
          <Link to={"/sign-in"}>
            <button className="registration-button">Sign In</button>
          </Link>
        </form>
      </div>
    );
  }
}
