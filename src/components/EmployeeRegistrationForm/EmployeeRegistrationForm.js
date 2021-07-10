import React, { Component } from "react";
import "./EmployeeRegistrationForm.css";
import { Redirect } from "react-router-dom";
import InputError from "./EmployeeRegistrationFormErr";
import AuthApiService from "../../Services/auth-api-services";
import PropTypes from "prop-types";

export default class EmployeeRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: { value: "", touched: false },
      code: { value: this.props.wp, touched: this.props.wp || false },
      password: { value: "", touched: false },
      passwordConfirm: { value: "", touched: false },
      nickname: { value: "", touched: false },
      submitting: false,

      signIn: false,
      create: false,
    };
  }

  updateUserName = (value) => {
    this.setState({ userName: { value, touched: true } });
  };

  updateNickname = (value) => {
    this.setState({ nickname: { value, touched: true } });
  };

  updateCode = (value) => {
    this.setState({ code: { value, touched: true } });
  };

  updatePassword = (value) => {
    this.setState({ password: { value, touched: true } });
  };

  updatePasswordConfirm = (value) => {
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
    const { passwordConfirm, password } = this.state;

    if (passwordConfirm.value.length < 1) {
      return "Please confirm password";
    }
    if (passwordConfirm.value !== password.value) {
      return "Password does not match";
    }
  };

  setAllToTouched = () => {
    const { userName, nickname, code, password, passwordConfirm } = this.state;

    this.setState({
      userName: { value: userName.value, touched: true },
      code: { value: code.value, touched: true },
      password: { value: password.value, touched: true },
      passwordConfirm: { value: passwordConfirm.value, touched: true },
      nickname: { value: nickname.value, touched: true },
    });
  };

  clearValues = () => {
    this.setState({
      userName: { value: "", touched: false },
      code: { value: "", touched: false },
      password: { value: "", touched: false },
      passwordConfirm: { value: "", touched: false },
      nickname: { value: "", touched: false },
    });
  };

  handleSubmit = (e) => {
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
      this.setState({ submitting: true });
      const { userName, nickname, password, code } = this.state;
      const user = {
        username: userName.value,
        nickname: nickname.value,
        password: password.value,
        code: code.value,
        type: "pending",
        img: "",
      };
      AuthApiService.postMember(user)
        .then((res) => {
          this.clearValues();
          this.props.registered();
        })
        .catch((err) => {
          this.setState({ error: err.error.message, submitting: false });
        });
    }
  };

  goToSignIn = () => {
    this.setState({ signIn: true });
  };

  goToCreate = () => {
    this.setState({ create: true });
  };

  render() {
    const {
      userName,
      password,
      passwordConfirm,
      code,
      nickname,
      error,
      submitting,
      signIn,
      create,
    } = this.state;
    return (
      <div className="employee-registration">
        <form
          action=""
          className="employee-registration-form"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h2 className="form-name">Join a WorkPlace</h2>
          {error ? <p className="err-msg">{error}</p> : <></>}
          {/* employee name */}
          <label htmlFor="employee-name">Your Name</label>
          <input
            id="employee-name"
            type="text"
            className="new-employee"
            placeholder="Your Name"
            value={userName.value}
            onChange={(e) => this.updateUserName(e.target.value)}
          />
          <InputError
            hasError={this.validateUserName()}
            touched={userName.touched}
          />
          <label htmlFor="employee-nickname">Username</label>
          <input
            id="member-nickname"
            type="text"
            className="new-employee"
            placeholder="Username for signing in"
            value={nickname.value}
            onChange={(e) => this.updateNickname(e.target.value)}
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
            onChange={(e) => this.updatePassword(e.target.value)}
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
            onChange={(e) => this.updatePasswordConfirm(e.target.value)}
          />
          <InputError
            hasError={this.validatePasswordConfirm()}
            touched={passwordConfirm.touched}
          />
          {/* workplace code */}
          <label htmlFor="workplace-code">WorkPlace Code</label>
          <p className="input-desc">
            (The creator of the page will have this code)
          </p>
          <input
            id="workplace-code"
            type="text"
            className="new-employee"
            placeholder="WorkPlace Code"
            value={code.value}
            onChange={(e) => this.updateCode(e.target.value)}
          />
          <InputError hasError={this.validateCode()} touched={code.touched} />
          <button
            className="registration-button"
            type="submit"
            disabled={submitting}
          >
            Register
          </button>
          <p className="existing-user">Already a member of a WorkPlace?</p>
          <button
            className="registration-button"
            type="button"
            onClick={this.goToSignIn}
          >
            Sign In
          </button>

          <p className="create-wp">Are you creating a new WorkPlace?</p>

          <button
            className="registration-button create-wp"
            onClick={this.goToCreate}
            type="button"
          >
            Create Wp
          </button>

          {signIn ? <Redirect to={"sign-in"} /> : <></>}
          {create ? <Redirect to={"create"} /> : <></>}
        </form>
      </div>
    );
  }
}

EmployeeRegistrationForm.propTypes = {
  registered: PropTypes.func.isRequired,
};
