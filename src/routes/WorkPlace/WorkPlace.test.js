import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import WorkPlace from "./WorkPlace";

it("renders without crashing", () => {
  const match = {
    params: {
      user: "testuser",
      wp: "Tesla"
    }
  };
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <WorkPlace match={match} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
