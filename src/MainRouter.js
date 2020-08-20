import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParcelTable from "./ParcelTable";
import { Home } from "./Home";
import React from "react";
import {outOfStateTableData} from "./OutOfStateTableData"

export default function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/out-of-state">
          <ParcelTable tableData={outOfStateTableData} />
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
