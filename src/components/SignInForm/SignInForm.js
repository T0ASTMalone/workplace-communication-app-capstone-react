import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SignInForm.css";
import SignInError from "./SignInError";
import users from "../../test-users";
//import AuthApiService from "../../Services/auth-api-services";

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userName: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      }
    };
  }

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
    this.setState({ userName: { value: ev, touched: true } });
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    if (this.validatePassword() || this.validateUserName()) {
      this.setAllToTouched();
    } else {
      let userName = this.state.userName.value;
      let validUser = null;
      users.forEach(user => {
        if (user.user_alias === userName) {
          validUser = user;
        }
      });
      if (validUser !== null) {
        this.props.onLoginSuccess(validUser.workplace, validUser.user_alias);
      }
      /*this.setState({ error: null });
      const { email, password } = this.state;
      AuthApiService.postLogin({
        userName: userName.value,
        password: password.value
      })
        .then(res => {
          this.setState({
            userName: { value: "", touched: false },
            password: { value: "", touched: false }
          });
          this.props.onLoginSuccess(res.payload.user_id);
        })
        .catch(res => {
          this.setState({ error: res.error });
        });*/
    }
  };

  setAllToTouched = () => {
    this.setState({
      userName: { value: "", touched: true },
      password: { value: "", touched: true }
    });
  };

  updateUserName = userName => {
    this.setState({ userName: { value: userName, touched: true } });
  };

  updatePassword = password => {
    this.setState({ password: { value: password, touched: true } });
  };

  validateUserName = () => {
    const userName = this.state.userName.value;
    if (userName < 1) {
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
    const { error, userName, password } = this.state;
    console.log(this.validatePassword(), this.validateUserName());
    return (
      <>
        <form
          action="sign-in"
          className="sign-in"
          onSubmit={this.handleSubmitJwtAuth}
        >
          <h2 className="form-name">Sign In</h2>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <label htmlFor="user">User Name</label>
          <input
            id="user"
            type="text"
            className="sign-in-input login"
            placeholder="User Name"
            onChange={e => this.handleUpdateUserName(e.target.value)}
            //required
          />
          <SignInError
            hasError={this.validateUserName()}
            touched={userName.touched}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="sign-in-input login"
            placeholder="password"
            onChange={e => this.handleUpdatePassword(e.target.value)}
            //required
            id="password"
          />
          <SignInError
            hasError={this.validatePassword()}
            touched={password.touched}
            className="login-error"
          />
          <div className="type-of-user">
            <label htmlFor="employer-select">Employer</label>
            <input id="employer-select" type="radio" />
            <label htmlFor="employee-select">Employee</label>
            <input type="radio" />
          </div>
          <button id="sign-in-button" className="button" type="submit">
            Sign In
            {/*Temp link to workplace */}
            {/* <Link to={"/workplace"}>Sign In</Link> */}
          </button>
        </form>
      </>
    );
  }
}

SignInForm.propTypes = {
  onLoginSuccess: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
