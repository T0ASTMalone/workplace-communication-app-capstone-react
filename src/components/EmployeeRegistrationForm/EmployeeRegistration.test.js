import React from "react";
import ReactDOM from "react-dom";
import EmployeeRegistrationForm from "./EmployeeRegistrationForm";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <EmployeeRegistrationForm />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
