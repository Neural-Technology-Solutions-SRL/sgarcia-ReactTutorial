import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

//component file
import TodoContainer from "./functionBased/components/TodoContainer";

//stylesheet
import "./functionBased/App.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <TodoContainer />
    </Router>
  </React.StrictMode>
);
