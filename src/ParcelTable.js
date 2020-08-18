import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

export default function MaterialTableDemo({parcels = []}) {
    const columns = [
        {title: 'Owner Name', field: 'OWNER_NAME'},
        {title: 'Owner Address', field: 'ADDRESS2'},
        {title: 'Owner State', field: 'OWNER_STAT'},
        // eslint-disable-next-line react/display-name
        {title: 'Property Address', render: rowData => <div>{`${rowData.ADDRESS_LA}, ${rowData.PROP_CITY}`}</div>},
    ]

    return (
        <MaterialTable
            title="Out of state landlords"
            columns={columns}
            data={parcels}
            options={{
                pageSize: 10,
                pageSizeOptions: [10, 40, 100],
                emptyRowsWhenPaging: false,
            }
            }
        />
    );
}
MaterialTableDemo.propTypes = {
    parcels: PropTypes.array
};
