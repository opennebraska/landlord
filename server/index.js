const parcelRetriever = require('./parcel-retriever');
const parcelsWriter = require('./parcels-writer')

parcelRetriever.retrieveParcels().then(parcelsRetrieved => {
    console.log(`Retrieved ${parcelsRetrieved.length} parcels.`);
    parcelsWriter.write(parcelsRetrieved);
});