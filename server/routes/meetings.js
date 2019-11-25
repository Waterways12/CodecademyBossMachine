const express = require('express');
const db = require('../db');
const meetingRouter = express.Router();


meetingRouter.get('/', (req, res) => {
    res.status(200).send(db.findDataArrayByName('meetings').data)
});

meetingRouter.post('/', (req, res) => {
    let callback = db.addToDatabase('meetings', db.createMeeting());
    res.status(201).send(callback)
});

meetingRouter.delete('/', (req, res) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send()
});


module.exports = meetingRouter;