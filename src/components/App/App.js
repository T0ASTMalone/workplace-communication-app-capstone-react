import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import LandingPage from "../../routes/LandingPage/LandingPage";
import SignInPage from "../../routes/SignInPage/SignInPage";
import WorkPlace from "../../routes/WorkPlace/WorkPlace";
import Registration from "../../routes/Registration/Registration";

function App() {
  return (
    <div className="App">
      <header>
        <Route path={"/"} component={Header} />
      </header>

      <main>
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route path={"/workplace"} component={WorkPlace} />
          <Route path={"/sign-in"} component={SignInPage} />
          <Route path={"/create"} component={Registration} />
          <Route path={"/join"} component={Registration} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
