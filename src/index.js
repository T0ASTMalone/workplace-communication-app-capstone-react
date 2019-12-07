import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.js";
import { WorkPlaceProvider } from "./context/WorkPlaceContext";

ReactDOM.render(
  <BrowserRouter>
    <WorkPlaceProvider>
      <App />
    </WorkPlaceProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
