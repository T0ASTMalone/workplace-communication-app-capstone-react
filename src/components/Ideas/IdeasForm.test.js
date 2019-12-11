import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import IdeasFrom from "./IdeasForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <IdeasFrom />
    </Router>,

    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
