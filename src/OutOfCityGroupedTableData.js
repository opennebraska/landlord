import outOfCityGroupedData from "./data/ownerInNebraskaOutOfOmahaGrouping.json";

export const outOfCityGroupedTableData = {
    title: "Out of Omaha properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER'},
        {title: 'Number of Properties', field: 'PROPERTY_COUNT', defaultSort: 'desc'},
    ],
    parcels: outOfCityGroupedData,
    action: [{
        icon: 'search',
        tooltip: 'See properties',
        onClick: (event, rowData) => window.location.assign(`/out-of-omaha?search=${encodeURIComponent(rowData.OWNER)}`)
    }],
}
