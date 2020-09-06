/* eslint-disable */
console.log(`Start Time Import: ${new Date().toString()}`)
const parcels = require('./parcels.json')
const fs = require('fs');
console.log(`End Time Import: ${new Date().toString()}`)
console.log(`Start Loop Time: ${new Date().toString()}`)
let totalNE = 0

let data = []

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
    return hasLowCondition && notOwnersProperty;
}

const includeInOutOfOmaha = (parcel) => {
    const ownerOutsideOmaha = parcel.OWNER_CITY.toUpperCase() !== "OMAHA";
    const ownerFromNebraska = parcel.OWNER_STAT.toUpperCase() === "NE";
    const propertyInsideOmaha = parcel.PROP_CITY.toUpperCase() === "OMAHA";
    return ownerOutsideOmaha && ownerFromNebraska && propertyInsideOmaha;
}

parcels.forEach((parcel) => {
    if(includeInOutOfOmaha(parcel)){
        data.push(parcel);
    }
})

const fileName = `parser-results-${new Date().getTime()}.json`
fs.writeFileSync(fileName, JSON.stringify(data), function (err) {
    if (err) return console.log(err);
    console.log(`Data in ${fileName}`);
  })
console.log(`End Loop Time: ${new Date().toString()}`)
