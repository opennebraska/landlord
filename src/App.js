import React, { useEffect } from "react";
import ReactGA from 'react-ga';
import "./App.css";
import MainRouter from "./MainRouter";

function App() {

    useEffect(() => {
        ReactGA.initialize('UA-175185008-1');
    })
  return (
    <React.Fragment>
      <MainRouter />
    </React.Fragment>
  );
}

export default App;
