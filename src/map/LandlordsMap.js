import React from 'react';
import {FeatureGroup, Marker, Popup} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ZipCodeGeoJson from "./ZipCodeGeoJson";

const useStyles = makeStyles(() => ({
    popupTitle: {
        fontSize: 14,
        fontWeight: "bold"
    },
    popupContent: {
        fontSize: 12
    }
}));

LandlordsMap.propTypes = {
    parcels: PropTypes.array.isRequired,
    source: PropTypes.string.isRequired,
    zipCodeFeatures: PropTypes.array
};

function LandlordsMap({parcels, source, zipCodeFeatures}) {
    const classes = useStyles();

    return <>
            {zipCodeFeatures &&
            <FeatureGroup>
                {zipCodeFeatures.map(zipCodeFeature => <ZipCodeGeoJson key={zipCodeFeature.properties.ZIP} feature={zipCodeFeature}/>)}
            </FeatureGroup>
            }
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
        </>;
}

export default LandlordsMap;