import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import LandingPage from "../../routes/LandingPage/LandingPage";
import SignInPage from "../../routes/SignInPage/SignInPage";
import WorkPlace from "../../routes/WorkPlace/WorkPlace";
import Registration from "../../routes/Registration/Registration";
import Footer from "../../components/Footer/Footer";
import PublicOnlyRoute from "../utils/PublicOnlyRoute";
import PrivateOnlyRoute from "../utils/PrivateRoute";
//import { subscribeToTimer } from "../../api";

export default class App extends React.Component {
  //constructor(props) {
  //  super(props);
  //subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
  //}

  state = {
    timestamp: "no timestamp yet"
  };

  render() {
    return (
      <div className="App">
        <header>
          <Route path={"/"} component={Header} />
        </header>

        <main>
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
        <Footer />
      </div>
    );
  }
}
