const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer();

app.use(express.static('public'));

// Endpoint to fetch Bible data
app.get('/bible-data', (req, res) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data', 'kjv_cleandata.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

// Endpoint to search for a specific book
app.get('/search', (req, res) => {
    const bookName = req.query.book;
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data', 'kjv_cleandata.csv'))
        .pipe(csv())
        .on('data', (data) => {
            if (data.book.toLowerCase() === bookName.toLowerCase()) {
                results.push(data);
            }
        })
        .on('end', () => {
            res.json(results);
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

