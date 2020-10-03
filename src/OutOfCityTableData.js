import outOfCityParcels from "./data/ownerInNebraskaOutOfOmahaParcels.json";

export const outOfCityTableData = {
    title: "Out of Omaha landlords",
    columns: [
        {title: 'Owner Name', field: 'OWNER_NAME'},
        {title: 'Owner Address', field: 'ADDRESS2'},
        {title: 'Owner City', field: 'OWNER_CITY'},
        {title: 'Property Address', field: 'ADDRESS_LA'},
        {title: 'Property City', field: 'PROP_CITY'},
        {title: 'Property Quality', field: 'QUALITY'},
        {title: 'Property Condition', field: 'CONDITION'},
    ],
    parcels: outOfCityParcels,
    search: true
}
