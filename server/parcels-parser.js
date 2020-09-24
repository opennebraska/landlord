const fse = require("fs-extra");

const isOwnersProperty = (parcel) => {
    const propertyAddress = parcel.ADDRESS_LA;
    const ownerAddress = parcel.ADDRESS2;
    return propertyAddress === ownerAddress;
}

const includeInLowCondition = (parcel) => {
    const lowConditions = ["LOW", "WORN OUT", "POOR"];
    const parcelCondition = parcel["CONDITION"];
    const hasLowCondition = lowConditions.includes(parcelCondition.toUpperCase());
    const notOwnersProperty = !isOwnersProperty(parcel);
    const propertyInsideOmaha = parcel.PROP_CITY.toUpperCase() === "OMAHA";
    return hasLowCondition && notOwnersProperty && propertyInsideOmaha;
}

const includeInOutOfOmaha = (parcel) => {
    const ownerOutsideOmaha = parcel.OWNER_CITY.toUpperCase() !== "OMAHA";
    const ownerFromNebraska = parcel.OWNER_STAT.toUpperCase() === "NE";
    const propertyInsideOmaha = parcel.PROP_CITY.toUpperCase() === "OMAHA";
    return ownerOutsideOmaha && ownerFromNebraska && propertyInsideOmaha;
}

const ownerOutOfState = (parcel) => {
    const ownerFromNebraska = parcel.OWNER_STAT.toUpperCase() === "NE";
    const propertyInsideOmaha = parcel.PROP_CITY.toUpperCase() === "OMAHA";
    return !ownerFromNebraska && propertyInsideOmaha;
}

async function parseAndWriteFiles(parcels) {
    let ownerOutOfNebraskaParcels = [];
    let lowPoorWornOutConditionParcels = [];
    let ownerInNebraskaOutOfOmahaParcels = [];

    parcels.forEach((parcel) => {
        if(ownerOutOfState(parcel)){
            ownerOutOfNebraskaParcels.push(parcel);
        }
        if(includeInOutOfOmaha(parcel)){
            ownerInNebraskaOutOfOmahaParcels.push(parcel);
        }
        if(includeInLowCondition(parcel)){
            lowPoorWornOutConditionParcels.push(parcel);
        }
    })
    await fse.ensureDir('/src/data/');
    await writeParcelsFile('./src/data/ownerOutOfNebraskaParcels.json', ownerOutOfNebraskaParcels);
    await writeParcelsFile('./src/data/ownerInNebraskaOutOfOmahaParcels.json', ownerInNebraskaOutOfOmahaParcels);
    await writeParcelsFile('./src/data/lowPoorWornOutConditionParcels.json', lowPoorWornOutConditionParcels);
}

const writeParcelsFile = (fileName, parcels) => {
    return fse.writeJSON(fileName, parcels);
}

module.exports = {parseAndWriteFiles}