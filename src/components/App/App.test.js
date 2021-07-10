import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { WorkPlaceProvider } from "../../context/WorkPlaceContext";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import App from "./App";

it("renders without crashing", () => {
  mockAllIsIntersecting(true);
  console.log("running tests");
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <WorkPlaceProvider>
        <App />
      </WorkPlaceProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
