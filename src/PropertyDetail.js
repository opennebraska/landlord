import React from 'react';
import {useParams} from "react-router-dom";
import lowConditionParcelsData from './data/lowPoorWornOutConditionParcels.json'
import outOfCityParcelsData from "./data/ownerInNebraskaOutOfOmahaParcels.json";
import outOfNebraskaParcelsData from "./data/ownerOutOfNebraskaParcels.json";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

export default function PropertyDetail() {

  const {source, pin} = useParams();
  let selectedProperty = {};
  if (source === "out-of-state") {
    selectedProperty = outOfNebraskaParcelsData.find(property => property.PIN === pin);
  } else if (source === "out-of-omaha") {
    selectedProperty = outOfCityParcelsData.find(property => property.PIN === pin);
  } else if (source === "low-condition") {
    selectedProperty = lowConditionParcelsData.find(property => property.PIN === pin);
  }

  const encodedPropertyAddress = encodeURIComponent(`${selectedProperty.ADDRESS_LA}, ${selectedProperty.PROP_CITY}, NE ${selectedProperty.PROP_ZIP}`);
  const violationLinks = selectedProperty.VIOLATION_LINKS || [];

  return (
      <>
        <Box mb={2}>
          <Breadcrumbs aria-label="breadcrumb" separator="›">
            <Typography color="textPrimary"><Link href={`/landlord/${source}`}>{source}</Link></Typography>
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
              <Typography variant={"body1"} component={"p"} gutterBottom><Link href={`/landlord/${source}?search=${encodeURIComponent(selectedProperty.OWNER_NAME)}`}>View All Properties</Link></Typography>
            </Box>
            <Box>
              <Typography variant={"h4"} gutterBottom>Property</Typography>
              <Typography variant={"body1"} component={"p"}>{selectedProperty.ADDRESS_LA}</Typography>
              <Typography variant={"body1"} component={"p"}>{selectedProperty.PROP_CITY}, NE {selectedProperty.PROP_ZIP}</Typography>
              <Typography variant={"body1"} component={"p"} gutterBottom><Link target="_blank" rel="noreferrer" href={`http://maps.google.com/?q=${encodedPropertyAddress}`}>View On Map</Link></Typography>
              <Typography variant={"h6"} gutterBottom>Condition/Quality</Typography>
              <Typography variant={"body1"} component={"p"}>Condition: {selectedProperty.CONDITION.trim() === "" ? 'Unknown' : selectedProperty.CONDITION}</Typography>
              <Typography variant={"body1"} component={"p"} gutterBottom>Quality: {selectedProperty.QUALITY.trim() || 'Unknown'}</Typography>
              <Typography variant={"h6"} gutterBottom>Case Links:</Typography>
              {violationLinks.length > 0 && violationLinks.map(link => <Typography variant={"body"} component={"p"} gutterBottom><Link target="_blank" rel="noreferrer" href={`${link}`}>View Case</Link></Typography>)}
              {violationLinks.length === 0 && <Typography variant={"body1"} component={"p"}>No Cases</Typography>}
            </Box>
          </CardContent>
        </Card>
      </>
  );
}
