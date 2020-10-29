import React, {Component} from 'react'
import lowConditionParcels from "./data/lowPoorWornOutConditionParcels.json";
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import PropTypes from "prop-types";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {withStyles} from "@material-ui/core/styles";

const styles = {
  popupTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  popupContent: {
    fontSize: 12
  }
};

class ParcelMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 41.3148,
      long: -96.1951,
      zoom: 11,
    }
  }

  render() {
    const position = [this.state.lat, this.state.long]
    const {classes} = this.props;
    return (
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <MarkerClusterGroup>
            {lowConditionParcels && lowConditionParcels.map(parcel => {
              return (
                  <Marker position={[parcel.LAT_LONG.lat, parcel.LAT_LONG.long]} key={parcel.PIN}>
                    <Popup>
                      <div className={classes.popupTitle}>{parcel.OWNER_NAME}</div>
                      <div className={classes.popupContent}>{parcel.ADDRESS_LA}</div>
                      <div className={classes.popupContent}>{parcel.PROP_CITY}, NE {parcel.PROP_ZIP}</div>
                    </Popup>
                  </Marker>
              )
            })}
          </MarkerClusterGroup>
        </Map>
    );
  }
}

ParcelMap.propTypes = {
  classes: PropTypes.object.isRequired,
  parcels: PropTypes.array,
};

export default withStyles(styles)(ParcelMap);
