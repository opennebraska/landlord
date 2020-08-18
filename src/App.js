import React from "react";
import "./App.css";
import MainAppBar from "./MainAppBar";
import ParcelTable from "./ParcelTable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Home";

function App() {
    return (
        <React.Fragment>
            <MainAppBar />
            <Router>
                <Switch>
                    <Route path="/out-of-state">
                        <ParcelTable />
                    </Route>
                    <Route path="/out-of-omaha">
                        <ParcelTable />
                    </Route>
                    <Route path="/poor-condition">
                        <ParcelTable />
                    </Route>
                    <Route path="/" exact={true}>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
