const proj4 = require('proj4')

//https://epsg.io/102704
proj4.defs('ESRI:102704','+proj=lcc +lat_1=40 +lat_2=43 +lat_0=39.83333333333334 +lon_0=-100 +x_0=500000.0000000002 +y_0=0 +datum=NAD83 +units=us-ft +no_defs')

function convertToLatLon(x, y) {
    const converted = proj4('ESRI:102704', 'WGS84', {x, y})
    return {lat: converted.y, long: converted.x}
}

module.exports = {convertToLatLon}