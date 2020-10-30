import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import PropTypes from "prop-types";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const styles = {
  popupTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  popupContent: {
    fontSize: 12
  },
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
};

class ParcelMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 41.3148,
      long: -96.1951,
      zoom: 11
    }
  }

  render() {
    const position = [this.state.lat, this.state.long]
    const {classes, parcels, source} = this.props;
    return (
        <Box className={classes.container}>
          <Box className={classes.breadcrumb} mb={2}>
            <Breadcrumbs aria-label="breadcrumb" separator="›">
              <Typography color="textPrimary"><Link href={`/landlord/${source}`}>{source}</Link></Typography>
              <Typography color="textPrimary">Property Map</Typography>
            </Breadcrumbs>
          </Box>
          <Box className={classes.map}>
            <Map center={position} zoom={this.state.zoom}>
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <MarkerClusterGroup>
                {parcels.map(parcel => {
                  return (
                      <Marker position={[parcel.LAT_LONG.lat, parcel.LAT_LONG.long]} key={parcel.PIN}>
                        <Popup>
                          <div className={classes.popupTitle}>{parcel.OWNER_NAME}</div>
                          <div className={classes.popupContent}>{parcel.ADDRESS_LA}</div>
                          <div className={classes.popupContent}>{parcel.PROP_CITY}, NE {parcel.PROP_ZIP}</div>
                          <div className={classes.popupContent}><a href={`/landlord/${source}/${parcel.PIN}`} target="_blank" rel="noreferrer">Property Detail</a></div>
                        </Popup>
                      </Marker>
                  )
                })}
              </MarkerClusterGroup>
            </Map>
          </Box>
        </Box>
    );
  }
}

ParcelMap.propTypes = {
  classes: PropTypes.object.isRequired,
  parcels: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired
};

export default withStyles(styles)(ParcelMap);
