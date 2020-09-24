const parcelRetriever = require('./parcel-retriever');
const parcelsParser = require('./parcels-parser')

parcelRetriever.retrieveParcels().then(parcelsRetrieved => {
    console.log(`Retrieved ${parcelsRetrieved.length} parcels.`);
    parcelsParser.parseAndWriteFiles(parcelsRetrieved).then(() => {
        console.log('Finished writing files.')
    });
});