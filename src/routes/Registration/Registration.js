import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Registration.css";
import EmployeeRegistrationForm from "../../components/EmployeeRegistrationForm/EmployeeRegistrationForm";
import EmployerRegistrationForm from "../../components/EmployerRegistrationForm/EmployerRegistrationForm";

export default class Registration extends Component {
  render() {
    let location = this.props.location.pathname;
    return (
      <div className="registration">
        {location === "/join" ? (
          <EmployeeRegistrationForm />
        ) : (
          <EmployerRegistrationForm />
        )}
      </div>
    );
  }
}

Registration.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
