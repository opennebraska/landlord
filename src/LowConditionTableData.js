import React from "react";
import lowConditionParcels from "./low_condition_properties.json";

export const lowConditionTableData = {
    title: "Low condition properties",
    columns: [
        {title: 'Owner Name', field: 'OWNER_NAME'},
        {title: 'Owner Address', field: 'ADDRESS2'},
        {title: 'Owner City', field: 'OWNER_CITY'},
        // eslint-disable-next-line react/display-name
        {title: 'Property Address', render: rowData => <div>{`${rowData.ADDRESS_LA}, ${rowData.PROP_CITY}`}</div>},
        {title: 'Property Quality', field: 'QUALITY'},
        {title: 'Property Condition', field: 'CONDITION'},
    ],
    parcels: lowConditionParcels,
}