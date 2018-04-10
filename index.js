// Load node modules
const http = require('http');

// Load custom modules
const server = require('./src/server');

// Define variables
const port = process.env.PORT || 3001;

// Create HTTP-Server using the src/server.js
console.log("Starting server...");
const httpServer = http.createServer(server);
httpServer.listen(port);

console.log("Server running on port 127.0.0.1:" + port + "!");