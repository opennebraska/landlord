import lowConditionParcels from "./data/lowPoorWornOutConditionParcels.json";

export const lowConditionTableData = {
    title: "Low condition properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER_NAME'},
        {title: 'Owner Address', field: 'ADDRESS2'},
        {title: 'Owner City', field: 'OWNER_CITY'},
        {title: 'Owner State', field: 'OWNER_STAT'},
        {title: 'Property Address', field: 'ADDRESS_LA'},
        {title: 'Property City', field: 'PROP_CITY'},
        {title: 'Property Quality', field: 'QUALITY'},
        {title: 'Property Condition', field: 'CONDITION'},
    ],
    parcels: lowConditionParcels,
    search: true
}
