import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParcelTable from "./ParcelTable";
import outOfStateParcels from "./owner_out_of_state.json";
import { Home } from "./Home";
import React from "react";

export default function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/out-of-state">
          <ParcelTable parcels={outOfStateParcels} />
        </Route>
        <Route path="/out-of-omaha">
          <ParcelTable />
        </Route>
        <Route path="/low-condition">
          <ParcelTable />
        </Route>
        <Route path="/" exact={true}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
