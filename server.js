const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./server/db');

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());
app.use(morgan('tiny'));

// Add middleware for parsing request bodies here:
app.use(bodyParser.json());

// // Mounting routers at '/api', '/db', '/checkMillionDollarIdea' paths.
// const apiRouter = require('./server/api');
// const ideaRouter = express.Router();
// app.use('/api/', apiRouter);
// app.use('/ideas/', ideaRouter);

//Minion Routing
app.get('/api/minions', (req, res) => {
  res.status(200).send(db.findDataArrayByName('minions').data);
});

app.get('/api/minions/:minionId', (req, res) => {
  let minionData = db.getFromDatabaseById('minions', req.params.minionId);
  if (minionData) {res.status(200).send(minionData)}
  else (res.status(404).send('No minion exists with this id!'))
});

//Need to add in code that checks it is a valid minion object
app.post('/api/minions', (req, res) => {
  let checkExistence = db.getAllFromDatabase('minions').filter(minion => minion.name === req.body.name);
  if (!checkExistence[0]) {
    let callback = db.addToDatabase('minions', req.body);
  res.status(201).send(callback)
} else {console.log('check failed!'); res.status(400).send('This minion already exists!')
}});

app.put('/api/minions/:minionId', (req,res) => {
  let verifyId = db.getFromDatabaseById('minions', req.params.minionId);
  if (verifyId) {
  let callback = db.updateInstanceInDatabase('minions', req.body);
  res.status(200).send(callback);
  } else {res.status(404).send("No minion exists with this id!")}
});

app.delete('/api/minions/:minionId', (req, res) => {
  let verifyId = db.getFromDatabaseById('minions', req.params.minionId);
  if (verifyId) {db.deleteFromDatabasebyId('minions', req.params.minionId); res.status(404).send('The minion has been removed from the premises.')}
  else {res.status(404).send("No minion exists with this id!")}
});

//Idea Routing
app.get('/api/ideas', (req, res) => {
  res.status(200).send(db.findDataArrayByName('ideas').data)
});

app.get('/api/ideas/:ideaId', (req, res) => {
  let ideaData = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (ideaData) {res.status(200).send(ideaData)}
  else { res.status(404).send('No idea exists with this id!')}
});

app.post('/api/ideas', (req, res) => {
  let checkExistence = db.getAllFromDatabase('ideas').filter(idea => req.body.name === idea.name);
  if (!checkExistence[0]) {
    let callback = db.addToDatabase('ideas', req.body);
    res.status(200).send(callback)
  } else {res.status(400).send('This idea already exists in our database!')}
});

app.put('/api/ideas/:ideaId', (req, res) => {
  let verifyId = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (verifyId) {
    let callback = db.updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(callback)
  } else {res.status(404).send('No idea exists with this id!')}
});

app.delete('/api/ideas/:ideaId', (req, res) => {
  let verifyId = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (verifyId) { 
    let callback = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(404).send('Idea successfully deleted.')
} else { res.status(404).send("This ID did not exist in our system.")}
});

//Meeting Routing
app.get('/api/meetings', (req, res) => {
  res.status(200).send(db.findDataArrayByName('meetings').data)
});

app.post('/api/meetings', (req, res) => {
  let callback = db.createMeeting();
    res.status(200).send(callback)
});

app.delete('/api/meetings/', (req, res) => {
    let callback = db.deleteAllFromDatabase('meetings');
    res.status(404).send("All meetings have been removed from your calendar.")
});

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
}
