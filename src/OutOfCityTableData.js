import React from "react";
import outOfCityParcels from "./owner_in_state_out_of_city.json";

export const outOfCityTableData = {
    title: "Out of Omaha landlords",
    columns: [
        {title: 'Owner Name', field: 'OWNER_NAME'},
        {title: 'Owner Address', field: 'ADDRESS2'},
        {title: 'Owner City', field: 'OWNER_CITY'},
        // eslint-disable-next-line react/display-name
        {title: 'Property Address', render: rowData => <div>{`${rowData.ADDRESS_LA}, ${rowData.PROP_CITY}`}</div>},
        {title: 'Property Quality', field: 'QUALITY'},
        {title: 'Property Condition', field: 'CONDITION'},
    ],
    parcels: outOfCityParcels,
}