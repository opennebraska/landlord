import outOfNebraskaGroupedData from "./data/ownerOutOfNebraskaGrouping.json";

export const outOfNebraskaGroupedTableData = {
    title: "Out of State Landlords with the most properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER'},
        {title: 'Number of Properties', field: 'PROPERTY_COUNT', defaultSort: 'desc'},
    ],
    parcels: outOfNebraskaGroupedData,
}
