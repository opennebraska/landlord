import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ParcelTable from "./ParcelTable";
import { Home } from "./Home";
import React from "react";
import {outOfStateTableData} from "./OutOfStateTableData"
import {outOfCityTableData} from "./OutOfCityTableData";
import {lowConditionTableData} from "./LowConditionTableData";

export default function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/out-of-state">
          <ParcelTable tableData={outOfStateTableData} />
        </Route>
        <Route path="/out-of-omaha">
          <ParcelTable tableData={outOfCityTableData} />
        </Route>
        <Route path="/low-condition">
          <ParcelTable tableData={lowConditionTableData} />
        </Route>
        <Route path="/" exact={true}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
