import React, { Component } from "react";
import "./EmployeeRegistrationForm.css";
import { Link } from "react-router-dom";
import InputError from "./EmployeeRegistrationFormErr";

export default class EmployeeRegistrationForm extends Component {
  state = {
    userName: { value: "", touched: false },
    code: { value: "", touched: false },
    password: { value: "", touched: false },
    passwordConfirm: { value: "", touched: false },
    nickname: { value: "", touched: false }
  };

  updateUserName = value => {
    this.setState({ userName: { value, touched: true } });
  };

  updateNickname = value => {
    this.setState({ nickname: { value, touched: true } });
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

  validateNickname = () => {
    let nickname = this.state.nickname.value;
    if (nickname.length < 1) {
      return "A nickname is required";
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
    const { userName, nickname, code, password, passwordConfirm } = this.state;
    this.setState({
      userName: { value: userName.value, touched: true },
      code: { value: code.value, touched: true },
      password: { value: password.value, touched: true },
      passwordConfirm: { value: passwordConfirm.value, touched: true },
      nickname: { value: nickname.value, touched: true }
    });
  };

  clearValues = () => {
    this.setState({
      userName: { value: "", touched: false },
      code: { value: "", touched: false },
      password: { value: "", touched: false },
      passwordConfirm: { value: "", touched: false },
      nickname: { value: "", touched: false }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.validateUserName() ||
      this.validatePassword() ||
      this.validatePasswordConfirm() ||
      this.validateCode() ||
      this.validateNickname()
    ) {
      this.setAllToTouched();
    } else {
      // const { userName, nickname, password, code } = this.state;
      // const user = {
      // username: userName.value,
      // nickname: nickname.value,
      //  password: password.value,
      //  code: code.value,
      //  type: "pending",
      //  img: "https://picsum.photos/50/50"
      // };
      this.clearValues();
    }
  };

  render() {
    const { userName, password, passwordConfirm, code, nickname } = this.state;
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
            placeholder="Name"
            value={userName.value}
            onChange={e => this.updateUserName(e.target.value)}
          />
          <InputError
            hasError={this.validateUserName()}
            touched={userName.touched}
          />
          <label htmlFor="employee-nickname">Nickname</label>
          <input
            id="member-nickname"
            type="text"
            className="new-employee"
            placeholder="Nickname"
            value={nickname.value}
            onChange={e => this.updateNickname(e.target.value)}
          />
          <InputError
            hasError={this.validateNickname()}
            touched={nickname.touched}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="new-employee"
            placeholder="Password"
            value={password.value}
            onChange={e => this.updatePassword(e.target.value)}
          />
          <InputError
            hasError={this.validatePassword()}
            touched={password.touched}
          />
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            id="password-confirm"
            type="password"
            className="new-employee"
            placeholder="Confirm Password"
            value={passwordConfirm.value}
            onChange={e => this.updatePasswordConfirm(e.target.value)}
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
            placeholder="WorkPlace Code"
            value={code.value}
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
            <button className="registration-button create-wp">
              Create a WorkPlace
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
