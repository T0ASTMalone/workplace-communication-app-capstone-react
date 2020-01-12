import React from "react";
import ReactDOM from "react-dom";
import WpInfo from "./WpInfo";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const props = {
    nickname: "test nickname",
    userName: "test name",
    userType: "creator",
    wpCode: "00000",
    workPlace: "Test wp name"
  };

  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <WpInfo props={props} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
