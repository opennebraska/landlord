const parcels = require('../src/data/ownerOutOfNebraskaParcels.json')
const fse = require("fs-extra");

const convertToPostgresInsert = (parcelsArray) => {
  const postgresStatement = parcelsArray.reduce((acc, parcel) => {
    const postgresParcelJson = {
      objectId: parcel.OBJECTID,
      pin: parcel.PIN,
      ownerName: parcel.OWNER_NAME,
      address1: parcel.ADDRESS1,
      address2: parcel.ADDRESS2,
      ownerCity: parcel.OWNER_CITY,
      ownerState: parcel.OWNER_STAT,
      ownerZip: parcel.OWNER_ZIP,
      propertyA: parcel.PROPERTY_A,
      house: parcel.HOUSE,
      streetDirection: parcel.STREET_DIR,
      streetName: parcel.STREET_NAM,
      streetType: parcel.STREET_TYP,
      apartment: parcel.APARTMENT,
      propertyCity: parcel.PROP_CITY,
      propertyZip: parcel.PROP_ZIP,
      secTwnRn: parcel.SEC_TWN_RN,
      additionN: parcel.ADDITION_N,
      block: parcel.BLOCK,
      lot: parcel.LOT,
      legal1: parcel.LEGAL1,
      legal2: parcel.LEGAL2,
      legal3: parcel.LEGAL3,
      legal4: parcel.LEGAL4,
      dcaaccType: parcel.DCAACCTYPE,
      class: parcel.CLASS,
      quality: parcel.QUALITY,
      condition: parcel.CONDITION,
      violationCount: parcel.VIOLATION_COUNT,
      openViolationCount: parcel.VIOLATIONS.filter((violation) => violation && violation.violationStatus? violation.violationStatus === "Open": false).length,
    }

    // const insertStatement = `insert into property ("time", ${Object.keys(postgresParcelJson).map(value=> `"${value}"`)}) values (NOW(), ${Object.values(postgresParcelJson).map(value => `'${value && value.toString().trim()||''}'`)})\n`
    const value = `(NOW(), ${Object.values(postgresParcelJson).map(value => `'${value && value.toString().replace("'", "''").trim() || ''}'`)})`
    acc.values.push(value)
    if (!acc.insert) {
      acc.insert = `insert into property ("time", ${Object.keys(postgresParcelJson).map(value => `"${value}"`)})`
    }
    return acc
  }, {insert: "", values: []})
  return `${postgresStatement.insert} values ${postgresStatement.values}`;
}

const filePath = './src/data/parcelPostgresInserts.txt'
try {
  fse.unlinkSync(filePath)
} catch (e) {
  console.log(e)
  console.log(`Probably alright, file was not found to delete.`)
}

fse.writeFileSync(filePath, convertToPostgresInsert(parcels), {flag: 'a'})
