const parcelRetriever = require('./parcel-retriever');
const violationsRetriever = require('./violations-retriever');
const violationDetailRetriever = require('./violation-detail-retriever')
const parcelsParser = require('./parcels-parser')

const buildFiles = async () => {
    const parcelsRetrieved = await parcelRetriever.retrieveParcels();
    console.log('Finished parcelRetriever.retrieveParcels()')
    const violationsRetrieved = await violationsRetriever.retrieveData();
    console.log('Finished violationsRetriever.retrieveData()')
    const violationDetails = await violationDetailRetriever.retrieveData(violationsRetrieved);
    console.log('Finished violationDetailRetriever.retrieveData(violationsRetrieved)')
    await parcelsParser.parseAndWriteFiles(parcelsRetrieved, violationsRetrieved, violationDetails);
}

buildFiles().then(r => console.log('Finished writing files.'))
