import outOfStateParcels from "./data/ownerOutOfNebraskaParcels.json";
import {COLUMNS} from "./columns";

export const outOfStateTableData = {
  title: "Out of State Landlords",
  columns: [
    COLUMNS["PIN"],
    COLUMNS["OWNER_NAME"],
    COLUMNS["ADDRESS2"],
    COLUMNS["OWNER_STAT"],
    COLUMNS["ADDRESS_LA"],
    COLUMNS["PROP_CITY"],
    COLUMNS["QUALITY"],
    COLUMNS["CONDITION"],
    COLUMNS["VIOLATION_COUNT"],
  ],
  parcels: outOfStateParcels,
  search: true,
  onRowClick: (event, rowData) => window.location.assign(`/landlord/out-of-state/${rowData.PIN}`)
}
