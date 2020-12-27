import React, {useEffect, useState} from 'react'
import {MapContainer, TileLayer} from 'react-leaflet';
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import nebraskaZipCodes from '../data/zipCodes.geo.json';
import LandlordsMap from "./LandlordsMap";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  breadcrumb: {
    flex: 0
  },
  map: {
    flex: 1
  }
}));

ParcelMap.propTypes = {
  parcels: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired
};

function ParcelMap(props) {
  const classes = useStyles();
  const [zipCodeFeatures, setZipCodeFeatures] = useState([]);
  const [lat] = useState(41.3148);
  const [lon] = useState(-96.1951);
  const [zoom] = useState(11);

  useEffect(() => {
    setZipCodeFeatures(nebraskaZipCodes.features);
  }, []);

  const {parcels, source} = props;
  return (<>
        <Box className={classes.container}>
          <Box className={classes.breadcrumb} mb={2}>
            <Breadcrumbs aria-label="breadcrumb" separator="›">
              <Typography color="textPrimary"><Link href={`/landlord/${source}`}>{source}</Link></Typography>
              <Typography color="textPrimary">Property Map</Typography>
            </Breadcrumbs>
          </Box>
          <Box className={classes.map}>
            <MapContainer center={[lat, lon]} zoom={zoom}>
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <LandlordsMap parcels={parcels} source={source} zipCodeFeatures={zipCodeFeatures}/>
            </MapContainer>
          </Box>
        </Box>
    </>);
}

export default ParcelMap;