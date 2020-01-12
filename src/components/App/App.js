import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import LandingPage from "../../routes/LandingPage/LandingPage";
import SignInPage from "../../routes/SignInPage/SignInPage";
import WorkPlace from "../../routes/WorkPlace/WorkPlace";
import Registration from "../../routes/Registration/Registration";
import Footer from "../../components/Footer/Footer";
import IdleService from "../../Services/idle-service";
//import PublicOnlyRoute from "../utils/PublicOnlyRoute";
import PrivateOnlyRoute from "../utils/PrivateRoute";
import AuthApiService from "../../Services/auth-api-services";
import TokenService from "../../Services/token-service";
//import { subscribeToTimer } from "../../api";

export default class App extends React.Component {
  //constructor(props) {
  //  super(props);
  //subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
  //}

  state = {
    hasError: false,
    timestamp: "no timestamp yet"
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
          {/* <p className="timestamp">
            This is the timer value: {this.state.timestamp}
          </p> */}
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
