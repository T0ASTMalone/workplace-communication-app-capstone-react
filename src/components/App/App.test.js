import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { WorkPlaceProvider } from "../../context/WorkPlaceContext";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <WorkPlaceProvider>
        <App />
      </WorkPlaceProvider>
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
