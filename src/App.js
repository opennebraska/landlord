import React from "react";
import ReactGA from 'react-ga';
import "./App.css";
import MainRouter from "./MainRouter";
import Helmet from "react-helmet";

ReactGA.initialize('UA-175185008-1');

function App() {

    return (
        <React.Fragment>
            <MainRouter/>
        </React.Fragment>
    );
}

export default App;
