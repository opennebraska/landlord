console.log(`Start Time Import: ${new Date().toString()}`)
const parcels = require('./parcels.json')
console.log(`End Time Import: ${new Date().toString()}`)
console.log(`Start Loop Time: ${new Date().toString()}`)
let totalNE = 0
for(let i = 0; i< parcels.length-1; i++){
    if(parcels[i].OWNER_STAT === 'NE'){
        totalNE+=1;
    }
}
console.log(`End Loop Time: ${new Date().toString()}`)
console.log(totalNE)
