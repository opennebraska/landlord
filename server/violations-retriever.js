const axios = require('axios');

const FIELDS = 'PIN,LINK';
const WHERE = '1%3D1';
const baseUrl = 'https://gis.dogis.org/arcgis/rest/services/OpenData_Planning/MapServer/11/query?';
const PAGE_SIZE_DEFAULT = 2000;
async function getParcelsCount() {
    const parcelsCountResponse = await axios.get(`${baseUrl}where=${WHERE}&returnCountOnly=true&f=json`);
    // TODO need to make sure there is data and count
    return parcelsCountResponse.data.count;
}
const getParcelsUrl = (resultOffset, resultRecordCount) => `${baseUrl}where=${WHERE}&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=${FIELDS}&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=${resultOffset}&resultRecordCount=${resultRecordCount}&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json`;

async function getParcels(page, pageSize) {
    const pageUrl = getParcelsUrl(page, pageSize);
    const parcelsFeaturesResponse = await axios.get(pageUrl);
    const parcelsFeatures = parcelsFeaturesResponse.data;
    return parcelsFeatures.features;
}

async function makeDataRequests(count, pageSize) {
    if (pageSize <= 0) {
        console.warn('Page size should be greater than 0.');
        return [];
    }

    const parcels = [];
    for (let countOffset = 0; countOffset < count;) {
        console.log(countOffset);
        const pageParcels = await getParcels(countOffset, pageSize);
        parcels.push(...pageParcels.map(pageParcel => pageParcel.attributes));
        countOffset += pageParcels.length;
    }
    return parcels;
}

async function retrieveData() {
    const parcelsCount = await getParcelsCount();
    console.log(`Requesting ${parcelsCount} violations.`);

    return await makeDataRequests(parcelsCount, PAGE_SIZE_DEFAULT);
}

module.exports = {retrieveData}
