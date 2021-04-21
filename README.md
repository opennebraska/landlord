Web UI visualizing Douglas County Nebraska Parcels database.

http://codefornebraska.github.io/landlord/

Questions about this project can be directed to Jack Dunn <jack@prineb.org> ([Policy, Research & Innovation](http://prineb.org))

Source data from [Douglas Country Nebraska Assessor / Register of Deeds](http://www.dcassessor.org/gis-mapping) GIS system.
Specifically: [this link](https://gis.dogis.org/arcgis/rest/services/OpenData_Layers/MapServer/38/query?outFields=*&where=1%3D1)
and then we chose JSON as the output format.

Task list, bug reports in [Github Issues](https://github.com/codefornebraska/landlord/issues).

## Programmer Information:

This is a React (Javascript) stack hosted via github.io back-ending to a 189MB `parcels.js` file
[hosted on Google Drive](https://drive.google.com/file/d/1b6LeSS8rUJG-ZTKIZz-b5BUuutZHuwbm/view?usp=sharing).
(It's actually trickier than that. We don't use that `parcels.js` file directly. We pull it into the local project
and parse it into three smaller files.)

Developer chat room (Slack): codefornebraska.slack.com #housing

## Getting Started

### Note: This project requires either pointing at the production api (no authentication needed) or a locally running landlord-api project [Landlord API](https://github.com/codefornebraska/landlords-api)

1. Clone repository
3. npm install
4. npm start
