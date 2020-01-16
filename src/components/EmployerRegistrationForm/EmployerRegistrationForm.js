import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import InputError from "./EmployeeRegistrationFormErr";
import "./EmployerRegistrationForm.css";
import AuthApiService from "../../Services/auth-api-services";

export default class EmployerRegistrationForm extends Component {
  state = {
    userName: { value: "", touched: false },
    company: { value: "", touched: false },
    password: { value: "", touched: false },
    passwordConfirm: { value: "", touched: false },
    nickname: { value: "", touched: false },
    submitting: false,
    signIn: false,
    join: false
  };

  updateUserName = value => {
    this.setState({ userName: { value, touched: true } });
  };
  updateNickname = value => {
    this.setState({ nickname: { value, touched: true } });
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
      return "Your name is required";
    }
  };
  validateNickname = () => {
    let nickname = this.state.nickname.value;
    if (nickname.length < 1) {
      return "A username is required";
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
    const { passwordConfirm, password } = this.state;

    if (passwordConfirm.value.length < 1) {
      return "Please confirm password";
    }
    if (passwordConfirm.value !== password.value) {
      return "Password does not match";
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

  clearValues = () => {
    this.setState({
      userName: { value: "", touched: false },
      company: { value: "", touched: false },
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
      this.validateCompany()
    ) {
      this.setAllToTouched();
    } else {
      this.setState({ submitting: true });
      const { userName, nickname, password, company } = this.state;
      const user = {
        username: userName.value,
        nickname: nickname.value,
        password: password.value,
        wp_name: company.value,
        wp_type: "company",
        user_type: "creator",
        img: ""
      };

      AuthApiService.postCreator(user)
        .then(res => {
          this.clearValues();
          this.props.registered();
        })
        .catch(err => {
          this.setState({ error: err.error.message, submitting: false });
        });
    }
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/sign-in");
  };

  goToSignIn = () => {
    this.setState({ signIn: true });
  };

  goToJoin = () => {
    this.setState({ join: true });
  };

  // add input for workplace type (project, company, team)
  render() {
    const {
      userName,
      nickname,
      company,
      password,
      passwordConfirm,
      error,
      submitting,
      signIn,
      join
    } = this.state;
    return (
      <div className="employer-registration">
        <form
          action=""
          className="employee-registration-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <h2 className="form-name">Create a WorkPlace</h2>
          {error ? <p className="err-msg">{error}</p> : <></>}
          <label htmlFor="employer-name">Your Name</label>
          <input
            id="employer-name"
            type="text"
            className="new-employer"
            placeholder="Your Name"
            value={userName.value}
            onChange={e => this.updateUserName(e.target.value)}
          />
          <InputError
            hasError={this.validateUserName()}
            touched={userName.touched}
          />
          <label htmlFor="employer-nickname">Username</label>
          <input
            id="employer-nickname"
            type="text"
            className="new-employer"
            placeholder="Username for signing in"
            value={nickname.value}
            onChange={e => this.updateNickname(e.target.value)}
          />
          <InputError
            hasError={this.validateNickname()}
            touched={nickname.touched}
          />
          <label htmlFor="company-name">WorkPlace Name</label>
          <p className="input-desc">(This will be the name of your page)</p>
          {/* project name */}
          <input
            id="company-name"
            type="text"
            className="new-employer"
            placeholder="Team, Project or Company Name"
            value={company.value}
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
            type="password"
            className="new-employer"
            placeholder="Password"
            value={password.value}
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
            type="password"
            className="new-employer"
            placeholder="Confirm Password"
            value={passwordConfirm.value}
            onChange={e => this.updatePasswordConfirm(e.target.value)}
          />
          <InputError
            hasError={this.validatePasswordConfirm()}
            touched={passwordConfirm.touched}
          />
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

          <p className="join">Joining an existing WorkPlace?</p>

          <button
            className="registration-button"
            type="button"
            onClick={this.goToJoin}
          >
            Join Wp
          </button>

          {signIn ? <Redirect to={"/sign-in"} /> : <></>}
          {join ? <Redirect to={"/join"} /> : <></>}
        </form>
      </div>
    );
  }
}
