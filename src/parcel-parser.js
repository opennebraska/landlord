/* eslint-disable */
console.log(`Start Time Import: ${new Date().toString()}`)
const parcels = require('./parcels.json')
const fs = require('fs');
console.log(`End Time Import: ${new Date().toString()}`)
console.log(`Start Loop Time: ${new Date().toString()}`)
let totalNE = 0

let data = []
parcels.forEach((parcel) => {
    const condition = parcel["CONDITION"];
    const lowConditions = ["LOW", "WORN OUT", "POOR"];
    if(lowConditions.includes(condition.toUpperCase())){
        data.push(parcel);
    }
})

const fileName = `parser-results-${new Date().getTime()}.json`
fs.writeFileSync(fileName, JSON.stringify(data), function (err) {
    if (err) return console.log(err);
    console.log(`Data in ${fileName}`);
  })
console.log(`End Loop Time: ${new Date().toString()}`)
