// This is how you set up a basic express server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.options('*', cors());

// Store tasks endpoint
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    const timestamp = new Date();

    // Store the task on the server or in a database
    console.log('Task stored:', task);
    res.status(201).send('Task stored successfully');
});

// add categories based on timestamp
app.get('/tasks', (req, res) => {
    const allTasks = getAllTasks();
    const now = new Date();
    const last24Hours = allTasks.filter((task) => now - new Date(task.timestamp) <= 24 * 60 * 60 * 1000);
    const lastWeek = allTasks.filter((task) => now - new Date(task.timestamp) <= 7 * 24 * 60 * 60 * 1000);
    const lastMonth = allTasks.filter((task) => now - new Date(task.timestamp) <= 30 * 24 * 60 * 60 * 1000);

    res.json({
        last24Hours,
        lastWeek,
        lastMonth,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// so now after this im modifying this file to handle POST requests for storing tasks. im going to install the body-parser middle to parse incoming json data
// npm install body-parser
function getAllTasks() {
    return [];
}