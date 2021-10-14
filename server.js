const express = require('express');
const {reset} = require('nodemon');
const path = require('path');
const http = require('http');
const WebSocketServer = require('websocket').server;
const Web3 = require('web3');
const cors = require('cors');
const wsPathResolver = require ('./utils/wspathresolver.js');

const app = express();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors()); // configure cors origins

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const transactionRoutes = require('./routes/transactions.js');
const blockRoutes = require('./routes/blocks');
const addressRoutes = require('./routes/addresses');

const web3 = new Web3('https://polygon-rpc.com/');
//const web3 = new Web3(new Web3.providers.IpcProvider('/data/polygon/bor/geth.ipc', require('net')));

app.use("/transactions", transactionRoutes);
app.use("/blocks", blockRoutes);
app.use("/addresses/", addressRoutes);

app.get('/', function (req, res) {
    res.end('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


// WS Server
const server = http.createServer();
server.listen(9898);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
      const parsedMessage = message.utf8Data.split("/");
      wsPathResolver.resolvePath(connection, parsedMessage);
    });

    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
module.exports = app;
