const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const results = [];

fs.createReadStream(path.join(__dirname, 'data', 'kjv_cleandata.csv'))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
    })
    .on('error', (error) => {
        console.error('Error reading CSV file:', error);
    });

