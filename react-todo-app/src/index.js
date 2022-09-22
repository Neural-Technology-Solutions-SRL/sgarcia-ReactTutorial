import React from "react";
import ReactDom from "react-dom";

//component file
import TodoContainer from "./functionBased/components/TodoContainer";

//stylesheet
import "./functionBased/App.css";

ReactDom.render(
  <React.StrictMode>
    <TodoContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
