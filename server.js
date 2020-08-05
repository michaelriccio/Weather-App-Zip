// Setup empty JS object to act as endpoint for all routes
const dataHolder = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/* Middleware*/
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('public'));
// Spin up the server
const port = 3000;
app.listen(port, () => {`requesting localhost: ${port}`});
// Callback to debug

// Initialize all route with a callback function
app.get('/all', (request, response) => {
    console.log(request.body);
    let data = request.body;
    dataHolder.push(data);
})
// Callback function to complete GET '/all'  YOU DID THIS WITH AN ARROW FUNCTION

// Post Route