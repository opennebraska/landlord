import outOfStateParcels from "./data/ownerOutOfNebraskaParcels.json";
import {COLUMNS} from "./columns";

export const outOfStateTableData = {
    title: "Out of state landlords",
    columns: [
      COLUMNS["OWNER_NAME"],
      COLUMNS["ADDRESS2"],
      COLUMNS["OWNER_STAT"],
      COLUMNS["ADDRESS_LA"],
      COLUMNS["PROP_CITY"],
      COLUMNS["QUALITY"],
      COLUMNS["CONDITION"],
    ],
    parcels: outOfStateParcels,
    search: true
}
