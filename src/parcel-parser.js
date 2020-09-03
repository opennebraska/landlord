/* eslint-disable */
console.log(`Start Time Import: ${new Date().toString()}`)
const parcels = require('./parcels.json')
const fs = require('fs');
console.log(`End Time Import: ${new Date().toString()}`)
console.log(`Start Loop Time: ${new Date().toString()}`)
let totalNE = 0

let data = undefined
for(let i = 0; i< parcels.length-1; i++){
    if(parcels[i].OWNER_STAT === 'NE'){
        totalNE+=1;
    }
}
const fileName = `parser-results-${new Date().getTime()}.json`
fs.writeFileSync(fileName, data, function (err) {
    if (err) return console.log(err);
    console.log(`Data in ${fileName}`);
  })
console.log(`End Loop Time: ${new Date().toString()}`)
