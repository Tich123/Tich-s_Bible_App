const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

const bibleData = [];

fs.createReadStream('kjv_cleandata.csv')
    .pipe(csv())
    .on('data', (row) => {
        bibleData.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
    });

app.get('/search', (req, res) => {
    const { book } = req.query;
    const result = bibleData.find(data => data.book === book);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
