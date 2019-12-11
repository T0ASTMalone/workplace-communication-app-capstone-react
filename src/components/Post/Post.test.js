import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Post from "./Post";

it("renders without crashing", () => {
  let post = {
    user: "alleykat",
    title: "test post title",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quidem dolores quasi rerum dolor, amet iste assumenda dicta, at alias eveniet ab quis aliquid. Ullam vel tenetur quasi quisquam mollitia.",
    date: new Date(),
    userImg: "https://picsum.photos/50/50"
  };

  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Post post={post} />
    </Router>,

    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
