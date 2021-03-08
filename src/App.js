import React from "react";
import ReactGA from 'react-ga';
import "./App.css";
import MainRouter from "./MainRouter";
import Helmet from "react-helmet";

ReactGA.initialize('UA-175185008-1');

function App() {

    return (
        <React.Fragment>
            <Helmet>
              <title>Landlords of Omaha</title>
              <meta name="description" content="Property information and housing code violations for rental properties in Omaha and Douglas County"/>
            </Helmet>
            <MainRouter/>
        </React.Fragment>
    );
}

export default App;
