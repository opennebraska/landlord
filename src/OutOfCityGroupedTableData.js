import outOfCityGroupedData from "./data/ownerInNebraskaOutOfOmahaGrouping.json";

export const outOfCityGroupedTableData = {
    title: "Out of Omaha Landlord Properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER'},
        {title: 'Properties', field: 'PROPERTY_COUNT', defaultSort: 'desc', width: 100},
    ],
    parcels: outOfCityGroupedData,
    onRowClick: (event, rowData) => window.location.assign(`/landlord/out-of-omaha?search=${encodeURIComponent(rowData.OWNER)}`)
}
