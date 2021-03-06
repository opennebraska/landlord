import React, {useEffect} from "react";
import ReactGA from "react-ga";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import Link from "@material-ui/core/Link";

export default function ViolationDetail({violations}) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, [])

  return (
      <MaterialTable
          title={""}
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
            emptyRowsWhenPaging: false,
            exportButton: true,
            headerStyle: {
              fontWeight: "bold"
            }
          }}
          columns={[
            {title: "Status", field: "violationStatus", cellStyle: {maxWidth: "1%", width: "1%"}},
            {title: "Occurrence", field: "violationDate", cellStyle: {maxWidth: "1%", width: "1%"}},
            {title: "Violation Section Title", field: "violationSectionTitle", cellStyle: {maxWidth: "8%", width: "8%"}},
            {title: "Specific Violation", field: "specificViolation", cellStyle: {maxWidth: "20%", width: "20%"}},
            {title: "Direction", field: "direction", cellStyle: {maxWidth: "1%", width: "1%"}},
            {title: "Floor", field: "floor", cellStyle: {maxWidth: "1%", width: "1%"}},
            {title: "Severity", field: "violationSeverityLevel", cellStyle: {maxWidth: "1%", width: "1%"}},
            {
              title: "Case", field: "link", cellStyle: {maxWidth: "1%", width: "1%"}, render: function renderRow(rowData) {
                return rowData.link && <Link target={"_blank"} rel={"noreferrer"} href={rowData.link}>Link</Link>
              }
            },
          ]}
          data={violations}
      />
  )
}

ViolationDetail.propTypes = {
  violations: PropTypes.array.isRequired,
}
