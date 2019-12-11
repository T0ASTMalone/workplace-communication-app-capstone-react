import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PostForm from "./PostForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <PostForm />
    </Router>,

    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
