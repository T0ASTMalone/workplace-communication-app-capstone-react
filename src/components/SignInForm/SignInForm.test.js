import React from "react";
import ReactDOM from "react-dom";
import SignInForm from "./SignInForm";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <SignInForm />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
