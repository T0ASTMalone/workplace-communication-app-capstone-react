import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SignInForm.css";
import SignInError from "./SignInError";
import users from "../../test-users";
import { Link } from "react-router-dom";
import WorkPlaceContext from "../../context/WorkPlaceContext";
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
    this.setState({ userName: { value: ev, touched: true } });
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    if (this.validatePassword() /*|| this.validateUserName()*/) {
      this.setAllToTouched();
    } else {
      // check if user is workplace creator or workplace user
      // if user make api call to user table in db
      // else make api call to creator table in db
      let userName = this.state.userName.value;
      let validUser = null;
      users.forEach(user => {
        if (user.user_alias === userName) {
          validUser = user;
        }
      });
      if (validUser !== null) {
        this.context.setLogged(true);
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
    const { userName, password } = this.state;
    this.setState({
      userName: { value: userName.value, touched: true },
      password: { value: password.value, touched: true }
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
            value={userName.value}
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
          <div className="type-of-user">
            <label htmlFor="employer-select">Employer</label>
            <input
              name="user-type"
              id="employer-select"
              type="radio"
              defaultChecked
            />
            <label htmlFor="employee-select">Employee</label>
            <input name="user-type" type="radio" />
          </div>
          <button id="sign-in-button" className="button" type="submit">
            Sign In
            {/*Temp link to workplace */}
            {/* <Link to={"/workplace"}>Sign In</Link> */}
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
  onLoginSuccess: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
