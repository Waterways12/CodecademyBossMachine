const express = require('express');
const db = require('../db');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const ideaRouter = express.Router();

//ID Checking Middleware
const verifyId = (req, res, next) => {
    let verifyId = db.getFromDatabaseById('ideas', req.params.ideaId);
    if (verifyId) { next()}
    else {res.status(404).send("No idea exists with this id!")}
};
// Middleware to check if res already exists in db;
const existenceCheck = (req, res, next) => {
    let checkExistence = db.getAllFromDatabase('ideas').filter(idea => idea.name === req.body.name);
    if (!checkExistence[0]) { next()
    } else {res.status(400).send('This idea already exists!')}
};

ideaRouter.get('/', (req, res) => {
    res.status(200).send(db.findDataArrayByName('ideas').data)
});
  
ideaRouter.get('/:ideaId', verifyId, (req, res) => {
    let ideaData = db.getFromDatabaseById('ideas', req.params.ideaId);
    res.status(200).send(ideaData)
});
  
ideaRouter.post('/', existenceCheck, checkMillionDollarIdea, (req, res) => {
    let callback = db.addToDatabase('ideas', req.body);
    res.status(201).send(callback)
});
  
ideaRouter.put('/:ideaId', verifyId, checkMillionDollarIdea, (req, res) => {
    let callback = db.updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(callback)
});
  
ideaRouter.delete('/:ideaId', verifyId, (req, res) => {
    let callback = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send('Idea successfully deleted.')
});
  

module.exports = ideaRouter;