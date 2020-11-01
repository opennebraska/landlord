import lowConditionParcels from "./data/lowPoorWornOutConditionParcels.json";
import {COLUMNS} from "./columns";

export const lowConditionTableData = {
  title: "Low Condition Properties",
  columns: [
    COLUMNS["PIN"],
    COLUMNS["OWNER_NAME"],
    COLUMNS["ADDRESS2"],
    COLUMNS["OWNER_CITY"],
    COLUMNS["OWNER_STAT"],
    COLUMNS["ADDRESS_LA"],
    COLUMNS["PROP_CITY"],
    COLUMNS["QUALITY"],
    COLUMNS["CONDITION"],
    COLUMNS["VIOLATION_COUNT"],
  ],
  parcels: lowConditionParcels,
  search: true,
  onRowClick: (event, rowData) => window.location.assign(`/landlord/low-condition/${rowData.PIN}`)
}
