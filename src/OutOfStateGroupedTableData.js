import outOfNebraskaGroupedData from "./data/ownerOutOfNebraskaGrouping.json";

export const outOfNebraskaGroupedTableData = {
    title: "Out of State properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER'},
        {title: 'Number of Properties', field: 'PROPERTY_COUNT', defaultSort: 'desc'},
    ],
    parcels: outOfNebraskaGroupedData,
    action: [{
        icon: 'search',
            tooltip: 'See properties',
            onClick: (event, rowData) => window.location.assign(`/landlord/out-of-state?search=${encodeURIComponent(rowData.OWNER)}`)
        }],
}
