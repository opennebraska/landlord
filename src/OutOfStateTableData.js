import outOfStateParcels from "./data/ownerOutOfNebraskaParcels.json";

export const outOfStateTableData = {
    title: "Out of state landlords",
    columns: [
        {title: 'Owner Name', field: 'OWNER_NAME'},
        {title: 'Owner Address', field: 'ADDRESS2'},
        {title: 'Owner State', field: 'OWNER_STAT'},
        {title: 'Property Address', field: 'ADDRESS_LA'},
        {title: 'Property City', field: 'PROP_CITY'},
        {title: 'Property Quality', field: 'QUALITY'},
        {title: 'Property Condition', field: 'CONDITION'},
    ],
    parcels: outOfStateParcels,
}
