import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Registration.css";
import EmployeeRegistrationForm from "../../components/EmployeeRegistrationForm/EmployeeRegistrationForm";
import EmployerRegistrationForm from "../../components/EmployerRegistrationForm/EmployerRegistrationForm";

export default class Registration extends Component {
  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/sign-in");
  };

  render() {
    let location = this.props.location.pathname;
    return (
      <div className="registration">
        {location === "/join" ? (
          <EmployeeRegistrationForm
            registered={this.handleRegistrationSuccess}
          />
        ) : (
          <EmployerRegistrationForm
            registered={this.handleRegistrationSuccess}
          />
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
