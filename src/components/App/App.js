import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import LandingPage from "../../routes/LandingPage/LandingPage";
import SignInPage from "../../routes/SignInPage/SignInPage";
import WorkPlace from "../../routes/WorkPlace/WorkPlace";
import Registration from "../../routes/Registration/Registration";
import Footer from "../../components/Footer/Footer";
import IdleService from "../../Services/idle-service";
import PrivateOnlyRoute from "../utils/PrivateRoute";
import AuthApiService from "../../Services/auth-api-services";
import TokenService from "../../Services/token-service";

export default class App extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidMount() {
    IdleService.setIdleCallBack(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();

      TokenService.queueCallBackBeforeExpiry(() =>
        AuthApiService.postRefreshToken()
      );
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
  };

  render() {
    return (
      <div className="App">
        <header className="header-container">
          <Route path={"/"} component={Header} />
        </header>

        <main className="app-main">
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <PrivateOnlyRoute
              path={"/workplace/:wp/:user"}
              component={WorkPlace}
            />
            <Route path={"/sign-in"} component={SignInPage} />
            <Route path={"/create"} component={Registration} />
            <Route path={"/join"} component={Registration} />
          </Switch>
        </main>
        <Route path={"/sign-in"} component={Footer} />
        <Route path={"/join"} component={Footer} />
        <Route path={"/create"} component={Footer} />
      </div>
    );
  }
}
