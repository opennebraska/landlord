import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import * as ReactGA from "react-ga";

const queryString = require('query-string');

export default function ParcelTable({tableData}) {
  const {title, columns, parcels, onRowClick, search = false} = tableData;

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
            exportButton: true,
            search: search,
            searchText: searchText.search || '',
            actionsColumnIndex: -1
          }}
          onRowClick={onRowClick}
          localization={{
            header: {
              actions: 'View'
            }
          }}
      />
  );
}
ParcelTable.propTypes = {
  tableData: PropTypes.object,
  search: PropTypes.bool,
};
