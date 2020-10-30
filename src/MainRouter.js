import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ParcelTable from "./ParcelTable";
import ParcelMap from "./ParcelMap";
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
import PropertyDetail from "./PropertyDetail";

export default function MainRouter() {
  return (
      <Router basename={"landlord"}>
        <MainAppBar>
          <Switch>
            <Route path="/out-of-omaha/map">
              <ParcelMap source="out-of-omaha" parcels={outOfCityTableData.parcels}/>
            </Route>
            <Route path="/out-of-omaha/:pin">
              <PropertyDetail source="out-of-omaha" parcels={outOfCityTableData.parcels}/>
            </Route>
            <Route path="/out-of-omaha">
              <ParcelTable tableData={outOfCityTableData}/>
            </Route>

            <Route path="/out-of-state/map">
              <ParcelMap source="out-of-state" parcels={outOfStateTableData.parcels}/>
            </Route>
            <Route path="/out-of-state/:pin">
              <PropertyDetail source="out-of-state" parcels={outOfStateTableData.parcels}/>
            </Route>
            <Route path="/out-of-state">
              <ParcelTable tableData={outOfStateTableData}/>
            </Route>

            <Route path="/low-condition/map">
              <ParcelMap source="low-condition" parcels={lowConditionTableData.parcels}/>
            </Route>
            <Route path="/low-condition/:pin">
              <PropertyDetail source="low-condition" parcels={lowConditionTableData.parcels}/>
            </Route>
            <Route path="/low-condition">
              <ParcelTable tableData={lowConditionTableData}/>
            </Route>

            <Route exact path="/about">
              <About/>
            </Route>

            <Route path="/" exact>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <ParcelTable tableData={lowConditionGroupedTableData}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <ParcelTable tableData={outOfNebraskaGroupedTableData}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <ParcelTable tableData={outOfCityGroupedTableData}/>
                </Grid>
              </Grid>
            </Route>
          </Switch>
        </MainAppBar>
      </Router>
  );
}
