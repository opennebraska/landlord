import React from "react";
import outOfStateParcels from "./owner_out_of_state.json";

export const outOfStateTableData = {
    title: "Out of state landlords",
    columns: [
        {title: 'Owner Name', field: 'OWNER_NAME'},
        {title: 'Owner Address', field: 'ADDRESS2'},
        {title: 'Owner State', field: 'OWNER_STAT'},
        // eslint-disable-next-line react/display-name
        {title: 'Property Address', render: rowData => <div>{`${rowData.ADDRESS_LA}, ${rowData.PROP_CITY}`}</div>},
    ],
    parcels: outOfStateParcels,
}