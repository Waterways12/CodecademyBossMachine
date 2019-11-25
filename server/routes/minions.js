const express = require('express');
const minionRouter = express.Router();
const db = require('../db');

//ID Checking Middleware
const verifyId = (req, res, next) => {
    let verifyId = db.getFromDatabaseById('minions', req.params.minionId);
    if (verifyId) { next()}
    else {res.status(404).send("No minion exists with this id!")}
};
// Middleware to check if ;
const existenceCheck = (req, res, next) => {
    let checkExistence = db.getAllFromDatabase('minions').filter(minion => minion.name === req.body.name);
    if (!checkExistence[0]) { next()
    } else {res.status(400).send('This minion already exists!')}
};

minionRouter.get('/', (req, res) => {
    res.status(200).send(db.findDataArrayByName('minions').data);
});
  
minionRouter.get('/:minionId', verifyId, (req, res) => {
    let minionData = db.getFromDatabaseById('minions', req.params.minionId);
      res.status(200).send(minionData);
});
  
//Need to add in code that checks it is a valid minion object
minionRouter.post('/', existenceCheck, (req, res) => {
      let callback = db.addToDatabase('minions', req.body);
    res.status(201).send(callback)
});
  
minionRouter.put('/:minionId', verifyId, (req,res) => {
    let callback = db.updateInstanceInDatabase('minions', req.body);
    res.status(200).send(callback);
});
  
minionRouter.delete('/:minionId', verifyId, (req, res) => {
      db.deleteFromDatabasebyId('minions', req.params.minionId); res.status(204).send()
});
  

  module.exports = minionRouter;