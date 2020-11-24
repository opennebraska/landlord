const fse = require("fs-extra");
const coordinateConverter = require('./coordinate-converter');

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

async function parseAndWriteFiles(parcels, violations) {
    let ownerOutOfNebraskaParcels = [];
    let ownerOutOfNebraskaGroupingCounts = {};

    let lowPoorWornOutConditionParcels = [];
    let lowPoorWornOutConditionGroupingCounts = {};

    let ownerInNebraskaOutOfOmahaParcels = [];
    let ownerInNebraskaOutOfOmahaGroupingCounts = {};

    parcels.forEach((parcel) => {
        parcel.VIOLATION_LINKS = violations.filter(violations => violations.PIN === parcel.PIN).map(violations => violations.Link);
        parcel.VIOLATION_COUNT = parcel.VIOLATION_LINKS.length;
        if (parcel.ADDRESS1 && parcel.ADDRESS1.trim()) {
            parcel.ADDRESS2 = `${parcel.ADDRESS1}, ${parcel.ADDRESS2}`;
        }
        if (parcel.APARTMENT && parcel.APARTMENT.trim()) {
            parcel.ADDRESS_LA = `${parcel.ADDRESS_LA}, Apt. ${parcel.APARTMENT}`;
        }
        if (parcel.X_COORD && parcel.Y_COORD) {
            parcel.LAT_LONG = coordinateConverter.convertToLatLon(parcel.X_COORD, parcel.Y_COORD);
        }
        if(ownerOutOfState(parcel)){
            ownerOutOfNebraskaParcels.push(parcel);
            ownerOutOfNebraskaGroupingCounts[parcel.OWNER_NAME]? ownerOutOfNebraskaGroupingCounts[parcel.OWNER_NAME] += 1 : ownerOutOfNebraskaGroupingCounts[parcel.OWNER_NAME] = 1;
        }
        if(includeInOutOfOmaha(parcel)){
            ownerInNebraskaOutOfOmahaParcels.push(parcel);
            ownerInNebraskaOutOfOmahaGroupingCounts[parcel.OWNER_NAME]? ownerInNebraskaOutOfOmahaGroupingCounts[parcel.OWNER_NAME] += 1 : ownerInNebraskaOutOfOmahaGroupingCounts[parcel.OWNER_NAME] = 1;
        }
        if(includeInLowCondition(parcel)){
            lowPoorWornOutConditionParcels.push(parcel);
            lowPoorWornOutConditionGroupingCounts[parcel.OWNER_NAME]? lowPoorWornOutConditionGroupingCounts[parcel.OWNER_NAME] += 1 : lowPoorWornOutConditionGroupingCounts[parcel.OWNER_NAME] = 1;
        }
    })

    const ownerOutOfNebraskaGrouping = [];
    Object.entries(ownerOutOfNebraskaGroupingCounts).forEach(entry => {
        const [key, value] = entry;
        ownerOutOfNebraskaGrouping.push({ OWNER: key, PROPERTY_COUNT: value})
    });

    const lowPoorWornOutConditionGrouping = [];
    Object.entries(lowPoorWornOutConditionGroupingCounts).forEach(entry => {
        const [key, value] = entry;
        lowPoorWornOutConditionGrouping.push({ OWNER: key, PROPERTY_COUNT: value})
    });

    const ownerInNebraskaOutOfOmahaGrouping = [];
    Object.entries(ownerInNebraskaOutOfOmahaGroupingCounts).forEach(entry => {
        const [key, value] = entry;
        ownerInNebraskaOutOfOmahaGrouping.push({ OWNER: key, PROPERTY_COUNT: value})
    });

    await fse.ensureDir('./src/data/');
    await writeParcelsFile('./src/data/ownerOutOfNebraskaParcels.json', ownerOutOfNebraskaParcels);
    await writeParcelsFile('./src/data/ownerOutOfNebraskaGrouping.json', ownerOutOfNebraskaGrouping);
    await writeParcelsFile('./src/data/ownerInNebraskaOutOfOmahaParcels.json', ownerInNebraskaOutOfOmahaParcels);
    await writeParcelsFile('./src/data/ownerInNebraskaOutOfOmahaGrouping.json', ownerInNebraskaOutOfOmahaGrouping);
    await writeParcelsFile('./src/data/lowPoorWornOutConditionParcels.json', lowPoorWornOutConditionParcels);
    await writeParcelsFile('./src/data/lowPoorWornOutConditionGrouping.json', lowPoorWornOutConditionGrouping);
}

const writeParcelsFile = (fileName, parcels) => {
    return fse.writeJSON(fileName, parcels);
}

module.exports = {parseAndWriteFiles, isOwnersProperty, includeInLowCondition, includeInOutOfOmaha, ownerOutOfState }
