const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));

// Function to clean the data by removing empty keys
const cleanData = (data) => {
    const cleanedData = {};
    for (let key in data) {
        if (key) {
            cleanedData[key] = data[key];
        }
    }
    return cleanedData;
};

// Endpoint to fetch Bible data
app.get('/bible-data', (req, res) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data', 'kjv_cleandata.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(cleanData(data)))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ error: 'Error reading CSV file' });
        });
});

// Endpoint to search for a specific book
app.get('/search', (req, res) => {
    const bookName = req.query.book;
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data', 'kjv_cleandata.csv'))
        .pipe(csv())
        .on('data', (data) => {
            const cleanedData = cleanData(data);
            if (cleanedData.book.toLowerCase() === bookName.toLowerCase()) {
                results.push(cleanedData);
            }
        })
        .on('end', () => {
            res.json(results);
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ error: 'Error reading CSV file' });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

