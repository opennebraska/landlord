const parcelRetriever = require('./parcel-retriever');

parcelRetriever.retrieveParcels().then(parcelsRetrieved => {
    console.log(`Retrieved ${parcelsRetrieved.length} parcels.`);
});