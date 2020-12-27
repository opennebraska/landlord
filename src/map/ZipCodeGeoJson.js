import React from 'react'
import PropTypes from "prop-types";
import {GeoJSON, Tooltip, useMap} from "react-leaflet";

ZipCodeGeoJson.propTypes = {
    feature: PropTypes.object.isRequired
};

function ZipCodeGeoJson({feature}) {
    const map = useMap()
    const pathOptions = {
        weight: 2,
        opacity: 1,
        color: 'green',
        fillOpacity: 0.1,
        fillColor: 'transparent',
    }
    const resetHighlight = (e) => {
        const layer = e.target;
        layer.setStyle(pathOptions);
        layer.unbindTooltip()
        layer.bindTooltip(feature.properties.ZIP, {permanent: true, opacity: 0.5});
        // layer.bindTooltip(feature.properties.ZIP, {className: 'normalTooltip', permanent: true, opacity: 0.5});
    }
    const highlight = (e) => {
        const layer = e.target;
        layer.setStyle({
            fillOpacity: .5,
            fillColor: 'yellow',
        });
        layer.unbindTooltip()
        layer.bindTooltip(feature.properties.ZIP, {permanent: true, opacity: 1});
        // layer.bindTooltip(feature.properties.ZIP, {className: 'highlightedTooltip', permanent: true, opacity: 1});
    }
    const zoomToFeature = (e) => {
        map.fitBounds(e.target.getBounds());
    }
    return <GeoJSON key={feature.properties.ZIP}
                    data={feature} style={pathOptions}
                    eventHandlers={{
                        click: zoomToFeature,
                        mouseout: resetHighlight,
                        mouseover: (e) => highlight(e, feature.properties.ZIP)
                    }}>
        <Tooltip permanent={true} opacity={.5}>{feature.properties.ZIP}</Tooltip>
    </GeoJSON>
}

export default ZipCodeGeoJson;