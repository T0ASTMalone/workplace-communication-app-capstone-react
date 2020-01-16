import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./LandingPage";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

it("renders without crashing", () => {
  mockAllIsIntersecting(true);
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <LandingPage />
    </Router>,

    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
