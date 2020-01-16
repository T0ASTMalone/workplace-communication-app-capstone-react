import React from "react";
import ReactDOM from "react-dom";
import SignInPage from "./SignInPage";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <SignInPage />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
