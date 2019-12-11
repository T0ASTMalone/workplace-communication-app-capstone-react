import React from "react";
import ReactDOM from "react-dom";
import EmployerRegistrationForm from "./EmployerRegistrationForm";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <EmployerRegistrationForm />
    </Router>,

    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
