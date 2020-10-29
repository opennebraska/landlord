import React, {Component} from 'react'
import lowConditionParcels from "./data/lowPoorWornOutConditionParcels.json";

import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import PropTypes from "prop-types";
import MarkerClusterGroup from "react-leaflet-markercluster";

export default class ParcelMap extends Component {
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
                                A pretty CSS3 popup. <br/> Easily customizable.
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
    parcels: PropTypes.array,
};
