import outOfCityParcels from "./data/ownerInNebraskaOutOfOmahaParcels.json";
import {COLUMNS} from "./columns";

export const outOfCityTableData = {
  title: "Out of Omaha landlords",
  columns: [
    COLUMNS["OWNER_NAME"],
    COLUMNS["ADDRESS2"],
    COLUMNS["OWNER_CITY"],
    COLUMNS["ADDRESS_LA"],
    COLUMNS["PROP_CITY"],
    COLUMNS["QUALITY"],
    COLUMNS["CONDITION"],
  ],
  parcels: outOfCityParcels,
  search: true
}
