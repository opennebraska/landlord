import lowConditionGroupedData from './data/lowPoorWornOutConditionGrouping.json'

export const lowConditionGroupedTableData = {
    title: "Low condition properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER'},
        {title: 'Properties', field: 'PROPERTY_COUNT', defaultSort: 'desc', width: 100},
    ],
    parcels: lowConditionGroupedData,
    onRowClick: (event, rowData) => window.location.assign(`/landlord/low-condition?search=${encodeURIComponent(rowData.OWNER)}`)
}
