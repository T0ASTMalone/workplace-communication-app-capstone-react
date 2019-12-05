import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";

function App() {
  return (
    <div className="App">
      <header>
        <Route path={"/"} component={Header} />
      </header>

      <main>
        <Switch></Switch>
      </main>
    </div>
  );
}

export default App;
