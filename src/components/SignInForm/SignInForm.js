import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SignInForm.css";
import SignInError from "./SignInError";
import { Link } from "react-router-dom";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import AuthApiService from "../../Services/auth-api-services";

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      nickname: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      },
      submitting: false
    };
  }

  static contextType = WorkPlaceContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  static defaultProps = {
    onLoginSuccess: () => {}
  };

  handleUpdatePassword(ev) {
    this.setState({ password: { value: ev, touched: true } });
  }

  handleUpdateUserName(ev) {
    this.setState({ nickname: { value: ev, touched: true } });
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    if (this.validatePassword() || this.validateUserName()) {
      this.setAllToTouched();
    } else {
      this.setState({ submitting: true });
      const { nickname, password } = this.state;
      AuthApiService.postLogin({
        nickname: nickname.value,
        password: password.value
      })
        .then(res => {
          this.context.clearContext();
          this.setState({
            nickname: { value: "", touched: false },
            password: { value: "", touched: false }
          });
          this.props.onLoginSuccess(res.wp_name, res.payload.user_id);
        })
        .catch(res => {
          this.setState({ error: res.error.message, submitting: false });
        });
    }
  };

  setAllToTouched = () => {
    const { nickname, password } = this.state;
    this.setState({
      nickname: { value: nickname.value, touched: true },
      password: { value: password.value, touched: true }
    });
  };

  updateUserName = nickname => {
    this.setState({ nickname: { value: nickname, touched: true } });
  };

  updatePassword = password => {
    this.setState({ password: { value: password, touched: true } });
  };

  validateUserName = () => {
    const nickname = this.state.nickname.value;
    if (nickname < 1) {
      return "A user name is required";
    }
  };

  validatePassword = () => {
    const password = this.state.password.value;
    if (password < 1) {
      return "A password is required";
    }
  };

  render() {
    const { error, nickname, password, submitting } = this.state;
    return (
      <>
        <form
          action="sign-in"
          className="sign-in"
          onSubmit={this.handleSubmitJwtAuth}
        >
          <h2 className="form-name">Sign In</h2>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <label htmlFor="user">Nickname</label>
          <input
            id="user"
            type="text"
            className="sign-in-input login"
            placeholder="Nickname"
            value={nickname.value}
            onChange={e => this.handleUpdateUserName(e.target.value)}
            //required
          />
          <SignInError
            hasError={this.validateUserName()}
            touched={nickname.touched}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="sign-in-input login"
            placeholder="password"
            value={password.value}
            onChange={e => this.handleUpdatePassword(e.target.value)}
            //required
            id="password"
          />
          <SignInError
            hasError={this.validatePassword()}
            touched={password.touched}
            className="login-error"
          />
          <button
            id="sign-in-button"
            className="button"
            type="submit"
            disabled={submitting}
          >
            Sign In
          </button>
          <p className="new-user">Are you new to WorkPlace?</p>
          <Link to={"/join"}>
            <button className="register-button">Register</button>
          </Link>
        </form>
      </>
    );
  }
}

SignInForm.propTypes = {
  onLoginSuccess: PropTypes.func
};
