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
            <Switch>
                <Route path="/out-of-state">
                    <MainAppBar>
                        <ParcelTable tableData={outOfStateTableData}/>
                    </MainAppBar>
                </Route>
                <Route path="/out-of-omaha">
                    <MainAppBar>
                        <ParcelTable tableData={outOfCityTableData}/>
                    </MainAppBar>
                </Route>
                <Route path="/low-condition">
                    <MainAppBar>
                        <ParcelTable tableData={lowConditionTableData}/>
                    </MainAppBar>
                </Route>
                <Route path="/about">
                    <MainAppBar>
                        <About/>
                    </MainAppBar>
                </Route>
                <Route path="/" exact={true}>
                    <MainAppBar>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <ParcelTable tableData={lowConditionGroupedTableData} search={false}/>
                            </Grid>
                            <Grid item xs={4}>
                                <ParcelTable tableData={outOfNebraskaGroupedTableData} search={false}/>
                            </Grid>
                            <Grid item xs={4}>
                                <ParcelTable tableData={outOfCityGroupedTableData} search={false}/>
                            </Grid>
                        </Grid>
                    </MainAppBar>
                </Route>
            </Switch>
        </Router>
    );
}
