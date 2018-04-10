/**
 * Main class for the cryptochat-webserver
 */

/*
*   Node.js Modules
*/
// Express WebServer
const express = require('express');
// Body parser for parsing in-body JSON
const bodyParser = require('body-parser');
// Morgan for logging requests in dev-mode
const morgan = require('morgan');
// Mongoose for the database connection
const mongoose = require('mongoose');
// JsonWebToken for authentication
const jsonWebToken = require('jsonwebtoken');

/*
*   Internal Modules
*/
// Main config file
const config = require('./config');

/*
*   Local Variables
*/
// Express.js WebServer object
const app = express();
// Database connection string
const databaseConnectionString = 'mongodb' 
                    + "://" + config.dbHost
                    + ":" + config.dbPort
                    + "/" + config.dbName;


/*
*   Logic / Functions
*/

/* Database connection */

// Connect to the database
mongoose.connect(databaseConnectionString);
// Mongoose connection
const db = mongoose.connection;

// on Error
db.on('error', error => {
    console.error('Error when connecting to database.');
    console.error(error);
});
// on Success
db.on('open', () => {
    console.log('Connected to database successfully!');
});


/* Express handling */
// Routes
const route = {
    USER: require('./routes/user'),
    CHATROOM: require('./routes/chatroom')
};

// Enable logging with morgan
app.use(morgan('dev'));

// Use the body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON
app.use(bodyParser.json());

// Allow CrossOrigin Requests and send headers
app.use((req, res, next) => {

    // Allow Cors generally
    res.header('Access-Control-Allow-Origin', '*');

    // Allowed headers
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );

    // Send all options
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 
            'GET, POST, PUT, PATCH, DELETE'
        );
        return res.status(200).json({});
    }

    next();
});

/* Routes */
// User Route
app.use('/user', route.USER);
// Chatroom Route
app.use('/chatroom', route.CHATROOM);

// No route was found
app.use((req, res, next) => {
    const error = new Error('Request not found');
    error.status = 404;
    next(error);
});

// Error when handling route
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            type: "Internal Server Error",
            message: error.message
        }
    });
});

// export
module.exports = app;