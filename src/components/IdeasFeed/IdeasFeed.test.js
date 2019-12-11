import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import IdeasFeed from "./IdeasFeed";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <IdeasFeed />
    </Router>,

    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
