const axios = require('axios');
let cheerio = require('cheerio');
let _ = require('lodash');

// const testLink = `https://www.omahapermits.com/permitinfo/Cap/CapDetail.aspx?Module=Enforcement&TabName=Enforcement&capID1=19CAP&capID2=00000&capID3=0044F`;
const CONCURRENT_REQUESTS = 64

const retrieveData = async (links) => {
    console.log(`Retrieving violation details on ${new Date()}`)
    const chunkSize = Math.ceil(links.length / CONCURRENT_REQUESTS);
    const chunks = _.chunk(links, chunkSize);
    const data = await Promise.all(chunks.map(async (chunk) => {
        return getViolationBatch(chunk);
    }));
    console.log(`Finished retrieving violation details on ${new Date()}`)
    return mergeData(data);
}

const getViolationBatch = async (links) => {
    const violationDetails = {};
    for (const violation of links) {
        if (violation.Link) {
            // console.log(`Retrieving violation details on ${violation.Link}`)
            const violationDetail = await getViolationData(violation.Link);
            if (violationDetails[violation.PIN]) {
                violationDetails[violation.PIN] = [...violationDetails[violation.PIN], ...violationDetail];

            } else {
                violationDetails[violation.PIN] = violationDetail;
            }
        }
    }
    return violationDetails;
}

const getViolationData = async (link) => {
    try {
        const {data: soup} = await axios.get(link);
        return scrapePageBetter(soup, link);
    } catch (e) {
        console.log(e);
    }
}

const mergeData = (data) => {
    let result = data.reduce(function(obj, item){
        Object.keys(item).forEach(function(key){
            if(!obj[key]) obj[key] = [].concat(item[key])
            else {
                if(Array.isArray(item[key]))
                    obj[key].push(...item[key])
                else
                    obj[key].push(item[key]);
            }
        });
        return obj;
    },{});
    return result;
}

const scrapePageBetter = (soup, link) => {
    let $ = cheerio.load(soup);
    const table = $('tr#trASITList');
    let violationsArray = [];
    $('tr', table).each((_idx, el) => {
        const details = $('div.MoreDetail_ItemCol2 span', el).toArray();
        // console.log(`Number of violation details = ${details.length}`)
        if (details.length === 7) {
            const violationStatus = $(details[0]).text()
            const violationDate = $(details[1]).text()
            const violationCompliedDate = $(details[2]).text();
            const violationSectionTitle = $(details[2]).text()
            const specificViolation = $(details[3]).text()
            const violationSeverityLevel = $(details[4]).text()
            const photoIdNo = $(details[5]).text()
            violationsArray.push({
                violationStatus,
                violationDate,
                violationCompliedDate,
                violationSectionTitle,
                specificViolation,
                violationSeverityLevel,
                photoIdNo,
                link
            });
        } else if (details.length === 8) {
            const violationStatus = $(details[0]).text()
            const violationDate = $(details[1]).text()
            const violationSectionTitle = $(details[2]).text()
            const specificViolation = $(details[3]).text()
            const direction = $(details[4]).text()
            const floor = $(details[5]).text()
            const violationSeverityLevel = $(details[6]).text()
            const photoIdNo = $(details[7]).text()
            violationsArray.push({
                violationStatus,
                violationDate,
                violationSectionTitle,
                specificViolation,
                direction,
                floor,
                violationSeverityLevel,
                photoIdNo,
                link
            });
        } else if (details.length === 9) {
            const violationStatus = $(details[0]).text();
            const violationDate = $(details[1]).text();
            const violationCompliedDate = $(details[2]).text();
            const violationSectionTitle = $(details[3]).text();
            const specificViolation = $(details[4]).text();
            const direction = $(details[5]).text();
            const floor = $(details[6]).text();
            const violationSeverityLevel = $(details[7]).text();
            const photoIdNo = $(details[8]).text();
            violationsArray.push({
                violationStatus,
                violationDate,
                violationCompliedDate,
                violationSectionTitle,
                specificViolation,
                direction,
                floor,
                violationSeverityLevel,
                photoIdNo,
                link
            });
        } else if (details.length === 10) {
            const violationStatus = $(details[0]).text();
            const violationDate = $(details[1]).text();
            const violationCompliedDate = $(details[2]).text();
            const violationSectionTitle = $(details[3]).text();
            const specificViolation = $(details[4]).text();
            const direction = $(details[5]).text();
            const floor = $(details[6]).text();
            const location = $(details[7]).text();
            const violationSeverityLevel = $(details[8]).text();
            const photoIdNo = $(details[9]).text();
            violationsArray.push({
                violationStatus,
                violationDate,
                violationCompliedDate,
                violationSectionTitle,
                specificViolation,
                direction,
                floor,
                location,
                violationSeverityLevel,
                photoIdNo,
                link
            });
        }
    })
    return violationsArray;
}

module.exports = {retrieveData}
