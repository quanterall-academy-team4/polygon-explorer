const express = require('express');
const {reset} = require('nodemon');
const path = require('path');
const app = express();
const PORT = 3000;
const Web3 = require('web3');
const cors = require('cors');

app.use(cors()); // configure cors origins

const transactionRoutes = require('./routes/transactions.js');
const blockRoutes = require('./routes/blocks');
const addressRoutes = require('./routes/addresses');

//const web3 = new Web3('https://polygon-rpc.com/');
const web3 = new Web3(new Web3.providers.IpcProvider('/data/polygon/bor/geth.ipc', require('net')));

app.use("/transactions", transactionRoutes);
app.use("/blocks", blockRoutes);
app.use("/addresses/", addressRoutes);

app.get('/', function (req, res) {
    res.end('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
module.exports = app;