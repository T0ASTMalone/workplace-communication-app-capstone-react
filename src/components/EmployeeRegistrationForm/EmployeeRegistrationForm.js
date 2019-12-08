import React, { Component } from "react";
import "./EmployeeRegistrationForm.css";
import { Link } from "react-router-dom";
import InputError from "./EmployeeRegistrationFormErr";
import uuid from "uuid";

export default class EmployeeRegistrationForm extends Component {
  state = {
    userName: { value: "", touched: false },
    code: { value: "", touched: false },
    password: { value: "", touched: false },
    passwordConfirm: { value: "", touched: false }
  };

  updateUserName = value => {
    this.setState({ userName: { value, touched: true } });
  };
  updateCode = value => {
    this.setState({ code: { value, touched: true } });
  };
  updatePassword = value => {
    this.setState({ password: { value, touched: true } });
  };
  updatePasswordConfirm = value => {
    this.setState({ passwordConfirm: { value, touched: true } });
  };

  validateUserName = () => {
    let userName = this.state.userName.value;
    if (userName.length < 1) {
      return "A user name is required";
    }
  };

  validateCode = () => {
    let code = this.state.code.value;
    if (code.length < 1) {
      return "A WorkPlace code is required";
    }
  };
  validatePassword = () => {
    let value = this.state.password.value;
    if (value.length < 1) {
      return "A password is required";
    }
  };
  validatePasswordConfirm = () => {
    let value = this.state.passwordConfirm.value;
    if (value.length < 1) {
      return "Please confirm password";
    }
  };

  setAllToTouched = () => {
    const { userName, code, password, passwordConfirm } = this.state;
    this.setState({
      userName: { value: userName.value, touched: true },
      code: { value: code.value, touched: true },
      password: { value: password.value, touched: true },
      passwordConfirm: { value: passwordConfirm.value, touched: true }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.validateUserName() ||
      this.validatePassword() ||
      this.validatePasswordConfirm() ||
      this.validateCode()
    ) {
      this.setAllToTouched();
    } else {
      const { userName, password, code } = this.state;
      const user = {
        user_id: uuid(),
        user_name: userName.value,
        password: password.value,
        code: code.value,
        user_type: "user",
        user_status: "pending",
        user_img: "https://picsum.photos/50/50"
      };

      console.log(user);
    }
  };

  render() {
    const { userName, password, passwordConfirm, code } = this.state;
    return (
      <div className="employee-registration">
        <form
          action=""
          className="employee-registration-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <legend htmlFor="employee-registration-form">Join a WorkPlace</legend>
          {/* employee name */}
          <label htmlFor="employee-name">User Name</label>
          <input
            id="employee-name"
            type="text"
            className="new-employee"
            onChange={e => this.updateUserName(e.target.value)}
          />
          <InputError
            hasError={this.validateUserName()}
            touched={userName.touched}
          />
          {/* employee password */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            className="new-employee"
            onChange={e => this.updatePassword(e.target.value)}
          />
          <InputError
            hasError={this.validatePassword()}
            touched={password.touched}
          />
          {/* employee password confirm */}
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            id="password-confirm"
            type="text"
            className="new-employee"
            onChange={e => this.updatePassword(e.target.value)}
          />
          <InputError
            hasError={this.validatePasswordConfirm()}
            touched={passwordConfirm.touched}
          />
          {/* workplace code */}
          <label htmlFor="workplace-code">WorkPlace Code</label>
          <input
            id="workplace-code"
            type="number"
            className="new-employee"
            onChange={e => this.updateCode(e.target.value)}
          />
          <InputError hasError={this.validateCode()} touched={code.touched} />
          <button className="registration-button" type="submit">
            Register
          </button>
          <Link to={"/sign-in"}>
            <button className="registration-button">Sign In</button>
          </Link>
          <p className="create-wp">Are you creating a new WorkPlace?</p>
          <Link to={"/create"}>
            <button className="create-wp">Create a WorkPlace</button>
          </Link>
        </form>
      </div>
    );
  }
}
