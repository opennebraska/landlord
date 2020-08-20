import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

export default function MaterialTableDemo({tableData}) {
    const { title, columns, parcels } = tableData;

    return (
        <MaterialTable
            title={title}
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
    tableData: PropTypes.object,
};
