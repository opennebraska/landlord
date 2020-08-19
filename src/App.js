import React from "react";
import "./App.css";
import MainAppBar from "./MainAppBar";
import MainRouter from "./MainRouter";

function App() {
  return (
    <React.Fragment>
      <MainAppBar />
      <MainRouter />
    </React.Fragment>
  );
}

export default App;
