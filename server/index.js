const parcelRetriever = require('./parcel-retriever');
const violationsRetriever = require('./violations-retriever');
const parcelsParser = require('./parcels-parser')

const buildFiles = async () => {
    const parcelsRetrieved = await parcelRetriever.retrieveParcels();
    const violationsRetrieved = await violationsRetriever.retrieveData();
    await parcelsParser.parseAndWriteFiles(parcelsRetrieved, violationsRetrieved);
}

buildFiles().then(r => console.log('Finished writing files.'))
