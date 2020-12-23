import React, {useEffect} from "react";
import ReactGA from "react-ga";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import {CardContent, Grid} from "@material-ui/core";

export default function ViolationDetail({violation}) {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, [])
    const {
        violationStatus,
        violationDate,
        violationCompliedDate,
        violationSectionTitle,
        specificViolation,
        direction,
        floor,
        violationSeverityLevel
    } = violation;

    const styles = {
        card: {minWidth: 500, flexGrow: 1, margin: 5}
    }

    return (
        <Grid container item md={12} lg={6}>
            <Card style={styles.card}>
                <CardContent>
                    {violationStatus &&
                    <Typography variant={"body1"} gutterBottom><b>Status: </b>{violationStatus}</Typography>}
                    {violationDate &&
                    <Typography variant={"body1"} component={"p"} gutterBottom><b>Date: </b>{violationDate}
                    </Typography>}
                    {violationCompliedDate &&
                    <Typography variant={"body1"} component={"p"} gutterBottom><b>Complied
                        Date: </b>{violationCompliedDate}
                    </Typography>}
                    {violationSectionTitle &&
                    <Typography variant={"body1"} component={"p"} gutterBottom><b>Violation Section
                        Title: </b>{violationSectionTitle}
                    </Typography>}
                    {specificViolation &&
                    <Typography variant={"body1"} component={"p"} gutterBottom><b>Specific
                        Violation: </b>{specificViolation}
                    </Typography>}
                    {direction &&
                    <Typography variant={"body1"} component={"p"} gutterBottom><b>Direction: </b>{direction}
                    </Typography>}
                    {floor &&
                    <Typography variant={"body1"} component={"p"} gutterBottom><b>Floor: </b>{floor}</Typography>}
                    {violationSeverityLevel &&
                    <Typography variant={"body1"} component={"p"}><b>Severity
                        Level: </b>{violationSeverityLevel}
                    </Typography>}
                </CardContent>
            </Card>
        </Grid>
    )

}

ViolationDetail.propTypes = {
    violation: PropTypes.object.isRequired,
}
