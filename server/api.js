const express = require('express');
const app = express();
const apiRouter = express.Router();
const db = require('./db.js');

//Minion routing
app.get('/minions', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
    console.log(db.getAllFromDatabase('minions'));
});

// app.post('/minions/', (req, res, next) => {

// });

//Idea Routing
app.get('/ideas/', (req, res, next) => {
    res.send(findDataArrayByName('ideas'));
    console.log(findDataArrayByName('ideas'));
});

//Meeting Routing
app.get('/ideas/', (req, res, next) => {
    res.send(findDataArrayByName('ideas'));
    console.log(findDataArrayByName('ideas'));
});


module.exports = apiRouter;
