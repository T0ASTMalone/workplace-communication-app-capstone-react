import React from "react";
import ReactDOM from "react-dom";
import PendingMember from "./PendingMember";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const member = {
    user_img: "testImg",
    username: "test user",
    nickname: "test nickname",
    user_id: 1
  };

  const decline = () => {};
  const accept = () => {};

  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <PendingMember member={member} accept={accept} decline={decline} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
