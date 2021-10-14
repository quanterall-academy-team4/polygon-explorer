const express = require('express');
const {reset} = require('nodemon');
const path = require('path');
const http = require('http');
const WebSocketServer = require('websocket').server;
const Web3 = require('web3');
const cors = require('cors');
const blocksController = require('./controllers/ws/blocks.js');

const app = express();
const PORT = 3000;

app.use(cors()); // configure cors origins

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
      
      /*
        Available paths:

        blocks/latest,
        blocks/{arg},
        blocks/pending,
        blocks/from=arg1&count=arg2

      */
      if (parsedMessage[0] === "blocks"){
          if (parsedMessage[1] === "latest"){
              blocksController.returnLatestBlock(connection);
          } else if (parsedMessage[1] !== "from"){
              blocksController.returnBlockByNumberOrHash(connection, parsedMessage[1]);
          } else if (parsedMessage[1] === pending){
              blocksController.returnPendingBlocks(connection);
          } else {
              // try split parsedMessage[1] to see if it is a valid from=arg1&count=arg2 path
              const pathSegments = parsedMessage[1].split("&");

              // valid path
              if (pathSegments.length == 2){
                // pathSegments[0] = from=arg1 ; extract argument
                const arg1 = pathSegments[0].split("=");
                const arg2 = pathSegments[1].split("=");

                if (arg1.length == 2 && arg2.length == 2){
                    blocksController.returnMultipleBlocksAfterThreshold(connection, arg1[1], arg2[1]);
                }
              } else {
                    blocksController.returnInvalidInput(connection);
              }
          }
      }
    });

    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
