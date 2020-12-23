import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ReactGA from "react-ga";
import PropTypes from "prop-types";
import ViolationDetail from "./ViolationDetail";
import {Grid} from "@material-ui/core";

export default function PropertyDetail(props) {
  const [selectedProperty, setSelectedProperty] = useState({QUALITY: "", CONDITION: ""});
  const [propertyCount, setPropertyCount] = useState(0);
  const [encodedPropertyAddress, setEncodedPropertyAddress] = useState("");
  const [violationLinks, setViolationLinks] = useState([]);
  const [violations, setViolations] = useState([]);

  const {pin} = useParams();
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const parcelData = props.parcels;
    const property = parcelData.find(propJson => propJson.PIN === pin);
    setSelectedProperty(property);
    setPropertyCount(parcelData.filter(propJson => propJson.OWNER_NAME === property.OWNER_NAME).length);
    setEncodedPropertyAddress(encodeURIComponent(`${property.ADDRESS_LA}, ${property.PROP_CITY}, NE ${property.PROP_ZIP}`));
    setViolationLinks(property.VIOLATION_LINKS || []);
    setViolations(property.VIOLATIONS || []);
  }, [pin]);

  return (
      <>
        <Box mb={2}>
          <Breadcrumbs aria-label="breadcrumb" separator="›">
            <Typography color="textPrimary"><Link href={`/landlord/${props.source}`}>{props.source}</Link></Typography>
            <Typography color="textPrimary">{selectedProperty.OWNER_NAME}</Typography>
          </Breadcrumbs>
        </Box>
        <Card>
          <CardContent>
            <Box mb={2}>
              <Typography variant={"h4"} gutterBottom>Owner</Typography>
              <Typography variant={"body1"} component={"p"}>{selectedProperty.OWNER_NAME}</Typography>
              <Typography variant={"body1"} component={"p"}>{selectedProperty.ADDRESS2}</Typography>
              <Typography variant={"body1"} component={"p"}>{selectedProperty.OWNER_CITY}, {selectedProperty.OWNER_STAT} {selectedProperty.OWNER_ZIP}</Typography>
              <Typography variant={"body1"} component={"p"} gutterBottom><Link href={`/landlord/${props.source}?search=${encodeURIComponent(selectedProperty.OWNER_NAME)}`}>{`View All ${propertyCount} Properties`}</Link></Typography>
            </Box>
            <Box>
              <Typography variant={"h4"} gutterBottom>Property</Typography>
              <Typography variant={"body1"} component={"p"}>{selectedProperty.ADDRESS_LA}</Typography>
              <Typography variant={"body1"} component={"p"}>{selectedProperty.PROP_CITY}, NE {selectedProperty.PROP_ZIP}</Typography>
              <Typography variant={"body1"} component={"p"} gutterBottom><Link target="_blank" rel="noreferrer" href={`http://maps.google.com/?q=${encodedPropertyAddress}`}>View On Map</Link></Typography>
              <Typography variant={"h6"} gutterBottom>Condition/Quality</Typography>
              <Typography variant={"body1"} component={"p"}>Condition: {selectedProperty.CONDITION.trim() || "Unknown"}</Typography>
              <Typography variant={"body1"} component={"p"} gutterBottom>Quality: {selectedProperty.QUALITY.trim() || "Unknown"}</Typography>
              <Typography variant={"h6"} gutterBottom>Case Links:</Typography>
              {violationLinks.length > 0 && violationLinks.map(link => <Typography key={link} variant={"body"} component={"p"} gutterBottom><Link target="_blank" rel="noreferrer" href={`${link}`}>View Case</Link></Typography>)}
              {violationLinks.length === 0 && <Typography variant={"body1"} component={"p"}>No Cases</Typography>}
              {violations.length > 0 && <Typography variant={"h4"} gutterBottom>Violations</Typography>}
              <Grid container>
              {violations.length > 0 && violations.map((violation, index) => <ViolationDetail key={index} violation={violation}/>)}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </>
  );
}

PropertyDetail.propTypes = {
  parcels: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired,
};
