import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

export default function MaterialTableDemo({parcels = []}) {
    const columns = [
        {title: 'Owner Name', field: 'OWNER_NAME'},
        {title: 'Owner Address', field: 'ADDRESS2'},
        {title: 'Owner State', field: 'OWNER_STAT'},
        {title: 'Property Address', field: 'ADDRESS_LA'},
        {title: 'Property Zip', field: 'PROP_CITY'},
    ]

    return (
        <MaterialTable
            title="Editable Example"
            columns={columns}
            data={parcels}
            options={{
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
