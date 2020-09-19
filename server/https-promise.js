'use strict';

const https = require('https');

module.exports = ((urlOptions, data = '') => {
    return new Promise((resolve, reject) => {
        const req = https.request(urlOptions,
            (res) => {
                let body = '';
                res.on('data', (chunk) => (body += chunk.toString()));
                res.on('error', reject);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode <= 299) {

                        resolve({statusCode: res.statusCode, headers: res.headers, body: body});
                    } else {
                        reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
                    }
                });
            });
        req.on('error', reject);
        req.write(data, 'binary');
        req.end();
    });
});