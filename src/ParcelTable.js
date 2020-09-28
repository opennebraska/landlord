import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import * as ReactGA from "react-ga";

export default function MaterialTableDemo({tableData}) {
    const { title, columns, parcels } = tableData;

    useEffect(() => ReactGA.pageview(window.location.pathname), []);

    return (
        <MaterialTable
            title={title}
            columns={columns}
            data={parcels}
            options={{
                pageSize: 10,
                pageSizeOptions: [10, 40, 100],
                emptyRowsWhenPaging: false,
                rowStyle: { height: 75 }
            }
            }
        />
    );
}
MaterialTableDemo.propTypes = {
    tableData: PropTypes.object,
};
