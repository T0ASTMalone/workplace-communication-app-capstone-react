import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import WorkPlace from "./WorkPlace";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <WorkPlace />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
