const {SSL_OP_EPHEMERAL_RSA} = require('constants');
const express = require('express');
const {reset} = require('nodemon');
const path = require('path');
const app = express();
const PORT = 3000;
const Web3 = require('web3');

const web3 = new Web3('https://polygon-rpc.com/');

// block hash or block num as parameter (both work)
app.get('/block=:arg', (req, res) => {
    web3.eth.getBlock(req.params.arg, true, (error, result) => { // TO DO: handle error
    }).then(value => {
        res.json(value);
    })
});

// fetch Y blocks after X blocks are skipped (most recent block first)
app.get('/blocks/from=:from&count=:count', (req, res) => {
    web3.eth.getBlock('latest', false, (error, result) => {}).then((value) => {
        const startBlockNumber = value.number - req.params.from; // get latest block number for calculations
        const blockCount = req.params.count;

        let fetchedBlocks = [];

        for (let i = startBlockNumber; i >= startBlockNumber - blockCount; i--) {
            web3.eth.getBlock(i, false, (error, result) => {}).then((value) => {
                fetchedBlocks.push(value);

                if (i == startBlockNumber - blockCount) {
                    res.end(JSON.stringify(fetchedBlocks));
                }
            })
        }
    });
});

// Returns address balance
app.get('/account=:hash', (req, res) => {
    web3.eth.getBalance(req.params.hash).then(value => {
        res.end(web3.utils.fromWei(value));
    })
})

app.get('/transaction/:hash', (req, res) => {
    web3.eth.getTransaction(req.params.hash).then((value) => {
        res.json(value);
    });
});

app.get('/', function (req, res) {
    res.end('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

