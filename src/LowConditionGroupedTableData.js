import lowConditionGroupedData from './data/lowPoorWornOutConditionGrouping.json'

export const lowConditionGroupedTableData = {
    title: "Low condition properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER'},
        {title: 'Number of Properties', field: 'PROPERTY_COUNT', defaultSort: 'desc'},
    ],
    parcels: lowConditionGroupedData,
}
