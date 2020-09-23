const path = require("path");
const fse = require("fs-extra");

const directoryName = "src/test-directory";

async function write(parcels) {
    await fse.ensureDir(directoryName);
    await fse.writeFile(path.join(directoryName, 'new-file.txt'), 'hello world');
}
module.exports = {write}