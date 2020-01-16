import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import Registration from "./Registration";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Route path={"/"} component={Registration} />
    </Router>,

    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
