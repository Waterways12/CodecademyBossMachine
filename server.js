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

// // Mounting routers at '/minions', '/ideas', '/meetings' paths.
const minionRouter = require('./server/routes/minions');
app.use('/api/minions', minionRouter);

const ideaRouter = require('./server/routes/ideas');
app.use('/api/ideas/', ideaRouter);

const meetingRouter = require('./server/routes/meetings');
app.use('/api/meetings', meetingRouter);


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
}
