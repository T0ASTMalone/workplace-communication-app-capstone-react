import React, { Component } from "react";
import { Link } from "react-router-dom";
// import uuid from "uuid";
import InputError from "./EmployeeRegistrationFormErr";

export default class EmployerRegistrationForm extends Component {
  state = {
    userName: { value: "", touched: false },
    company: { value: "", touched: false },
    password: { value: "", touched: false },
    passwordConfirm: { value: "", touched: false }
  };

  updateUserName = value => {
    this.setState({ userName: { value, touched: true } });
  };
  updateCompany = value => {
    this.setState({ company: { value, touched: true } });
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

  validateCompany = () => {
    let company = this.state.company.value;
    if (company.length < 1) {
      return "A WorkPlace name is required";
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
    const { userName, company, password, passwordConfirm } = this.state;
    this.setState({
      userName: { value: userName.value, touched: true },
      company: { value: company.value, touched: true },
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
      this.validateCompany()
    ) {
      this.setAllToTouched();
    } else {
      // const { userName, password, company } = this.state;
      // const user = {
      //   user_id: uuid(),
      //   user_name: userName.value,
      //   password: password.value,
      //   company: company.value,
      //   user_type: "admin",
      //   user_status: "active",
      //   user_img: "https://picsum.photos/50/50"
      // };
    }
  };

  render() {
    const { userName, company, password, passwordConfirm } = this.state;
    return (
      <div className="employer-registration">
        <form
          action=""
          className="employee-registration-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <legend htmlFor="">Create a WorkPlace</legend>
          {/* user name */}
          <label htmlFor="employer-name">User Name</label>
          <input
            id="employer-name"
            type="text"
            className="new-employer"
            onChange={e => this.updateUserName(e.target.value)}
          />
          <InputError
            hasError={this.validateUserName()}
            touched={userName.touched}
          />
          <label htmlFor="company-name">WorkPlace Name</label>
          {/* project name */}
          <input
            id="company-name"
            type="text"
            className="new-employer"
            onChange={e => this.updateCompany(e.target.value)}
          />
          <InputError
            hasError={this.validateCompany()}
            touched={company.touched}
          />
          <label htmlFor="password">Password</label>
          {/* password */}
          <input
            id="password"
            type="text"
            className="new-employer"
            onChange={e => this.updatePassword(e.target.value)}
          />
          <InputError
            hasError={this.validatePassword()}
            touched={password.touched}
          />
          <label htmlFor="password-confirm">Confirm Password</label>
          {/* confirm password */}
          <input
            id="password-confirm"
            type="text"
            className="new-employer"
            onChange={e => this.updatePasswordConfirm(e.target.value)}
          />
          <InputError
            hasError={this.validatePasswordConfirm()}
            touched={passwordConfirm.touched}
          />
          <button className="registration-button" type="submit">
            Register
          </button>
          <p className="existing-user">Already part of a WorkPlace?</p>
          <Link to={"/sign-in"}>
            <button className="registration-button">Sign In</button>
          </Link>

          <p className="join">Joining an existing WorkPlace?</p>
          <Link to={"/join"}>
            <button className="join-button">Join WorkPlace</button>
          </Link>
        </form>
      </div>
    );
  }
}
