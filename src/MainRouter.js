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
                        <ParcelTable tableData={lowConditionGroupedTableData}/>
                        <ParcelTable tableData={outOfNebraskaGroupedTableData}/>
                        <ParcelTable tableData={outOfCityGroupedTableData}/>
                    </MainAppBar>
                </Route>
            </Switch>
        </Router>
    );
}
