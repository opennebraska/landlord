import outOfCityParcels from "./data/ownerInNebraskaOutOfOmahaParcels.json";
import {COLUMNS} from "./columns";

export const outOfCityTableData = {
  title: "Out of Omaha Landlords",
  columns: [
    COLUMNS["PIN"],
    COLUMNS["OWNER_NAME"],
    COLUMNS["ADDRESS2"],
    COLUMNS["OWNER_CITY"],
    COLUMNS["ADDRESS_LA"],
    COLUMNS["PROP_CITY"],
    COLUMNS["ZIP_CODE"],
    COLUMNS["QUALITY"],
    COLUMNS["CONDITION"],
    COLUMNS["VIOLATION_COUNT"],
  ],
  parcels: outOfCityParcels,
  search: true,
  onRowClick: (event, rowData) => window.location.assign(`/landlord/out-of-omaha/${rowData.PIN}`)
}
