import outOfNebraskaGroupedData from "./data/ownerOutOfNebraskaGrouping.json";

export const outOfNebraskaGroupedTableData = {
    title: "Out of State properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER'},
        {title: 'Properties', field: 'PROPERTY_COUNT', defaultSort: 'desc', width: 100},
    ],
    parcels: outOfNebraskaGroupedData,
    onRowClick: (event, rowData) => window.location.assign(`/landlord/out-of-state?search=${encodeURIComponent(rowData.OWNER)}`)
}
