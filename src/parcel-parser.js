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

parcels.forEach((parcel) => {
    if(includeInLowCondition(parcel)){
        data.push(parcel);
    }
})

const fileName = `parser-results-${new Date().getTime()}.json`
fs.writeFileSync(fileName, JSON.stringify(data), function (err) {
    if (err) return console.log(err);
    console.log(`Data in ${fileName}`);
  })
console.log(`End Loop Time: ${new Date().toString()}`)
