import React from "react";
import ReactDOM from "react-dom";
import NewMembers from "./NewMembers";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <NewMembers />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
