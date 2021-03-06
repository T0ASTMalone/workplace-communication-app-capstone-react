import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Feed from "./Feed";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Feed />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
