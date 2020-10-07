import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ParcelTable from "./ParcelTable";
import React from "react";
import {outOfStateTableData} from "./OutOfStateTableData"
import {outOfCityTableData} from "./OutOfCityTableData";
import {lowConditionTableData} from "./LowConditionTableData";
import MainAppBar from "./MainAppBar";
import {About} from "./About";
import {outOfNebraskaGroupedTableData} from "./OutOfStateGroupedTableData";
import {outOfCityGroupedTableData} from "./OutOfCityGroupedTableData";
import {lowConditionGroupedTableData} from "./LowConditionGroupedTableData";
import Grid from "@material-ui/core/Grid";

export default function MainRouter() {
  return (
    <Router basename={"landlord"}>
      <MainAppBar>
        <Switch>
          <Route path="/out-of-state">
            <ParcelTable tableData={outOfStateTableData}/>
          </Route>
          <Route path="/out-of-omaha">
            <ParcelTable tableData={outOfCityTableData}/>
          </Route>
          <Route path="/low-condition">
            <ParcelTable tableData={lowConditionTableData}/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/" exact={true}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ParcelTable tableData={lowConditionGroupedTableData} search={false}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <ParcelTable tableData={outOfNebraskaGroupedTableData} search={false}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <ParcelTable tableData={outOfCityGroupedTableData} search={false}/>
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </MainAppBar>
    </Router>
  );
}
