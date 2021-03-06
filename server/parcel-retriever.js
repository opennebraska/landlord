const axios = require('axios');

const FIELDS = "OBJECTID,PIN,OWNER_NAME,ADDRESS1,ADDRESS2,OWNER_CITY,OWNER_STAT,OWNER_ZIP,PROPERTY_A,HOUSE,APARTMENT,PROP_CITY,PROP_ZIP,BLOCK,LOT,QUALITY,CONDITION,ADDRESS_LA,X_COORD,Y_COORD";
const WHERE = "UPPER(CONDITION)+IN+('POOR','LOW','WORN+OUT')+OR+(UPPER(OWNER_CITY)<>'OMAHA'+AND+UPPER(OWNER_STAT)='NE'+AND+UPPER(PROP_CITY)='OMAHA')+OR+UPPER(OWNER_STAT)<>'NE'";
const PAGE_SIZE_DEFAULT = 1000;

async function getParcelsCount() {
    const url = `https://gis.dogis.org/arcgis/rest/services/OpenData_Layers/MapServer/38/query?where=${WHERE}&returnCountOnly=true&f=json`;
    console.log(`Fetching data count from ${url}`);
    const parcelsCountResponse = await axios.get(url);
    // TODO need to make sure there is data and count
    return parcelsCountResponse.data.count;
}
const getParcelsUrl = (resultOffset, resultRecordCount) => `https://gis.dogis.org/arcgis/rest/services/OpenData_Layers/MapServer/38/query?where=${WHERE}&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=${FIELDS}&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=${resultOffset}&resultRecordCount=${resultRecordCount}&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json`;

async function getParcels(page, pageSize) {
    const pageUrl = getParcelsUrl(page, pageSize);
    console.log(`Fetching data from  ${pageUrl}`);
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

async function retrieveParcels() {
    const parcelsCount = await getParcelsCount();
    console.log(`Requesting ${parcelsCount} parcels.`);

    return await makeDataRequests(parcelsCount, PAGE_SIZE_DEFAULT);
}

module.exports = {retrieveParcels}
