import { findDataArrayByName} from './db';

const express = require('express');
const apiRouter = express.Router();

//Minion routing
app.get('/minions/', (req, res, next) => {
    res.send(findDataArrayByName('minions'));
    console.log(findDataArrayByName('minions'));
});

app.post('/minions/', (req, res, next) => {

});

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
