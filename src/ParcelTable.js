import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import * as ReactGA from "react-ga";
const queryString = require('query-string');

export default function MaterialTableDemo({tableData}) {
    const { title, columns, parcels, action, search = false } = tableData;

    useEffect(() => ReactGA.pageview(window.location.pathname), []);

    const searchText = queryString.parse(window.location.search)

    return (
        <MaterialTable
            title={title}
            columns={columns}
            data={parcels}
            options={{
                pageSize: 10,
                pageSizeOptions: [10, 40, 100],
                emptyRowsWhenPaging: false,
                rowStyle: { height: 75 },
                exportButton: true,
                search: search,
                searchText: searchText.search || '',
                actionsColumnIndex: -1
            }}
            actions={action}
            localization={{
                header: {
                    actions: 'View'
                }
            }}
        />
    );
}
MaterialTableDemo.propTypes = {
    tableData: PropTypes.object,
    search: PropTypes.bool,
};
