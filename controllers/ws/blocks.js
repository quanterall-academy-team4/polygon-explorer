const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.returnLatestBlock = (wsClient) => {
    web3.eth.getBlock('latest', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        wsClient.sendUTF(JSON.stringify(value));
    });
};

exports.returnBlockByNumberOrHash = (wsClient, input) => {
    web3.eth.getBlock(input, true, (error, result) => { // TO DO: handle error
    }).then(value => {
        wsClient.sendUTF(JSON.stringify(value));
    });
};

exports.returnPendingBlocks = (wsClient) => {
    web3.eth.getBlock('pending', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        wsClient.sendUTF(JSON.stringify(value));
    });
};

exports.returnMultipleBlocksAfterThreshold = (wsClient, from, count) => {
    web3.eth.getBlock('latest', false, (error, result) => {}).then((value) => {
        const startBlockNumber = value.number - req.params.from; // get latest block number for calculations
        const blockCount = req.params.count;

        let fetchedBlocks = [];

        for (let i = startBlockNumber; i >= startBlockNumber - blockCount; i--) {
            web3.eth.getBlock(i, false, (error, result) => {}).then((value) => {
                fetchedBlocks.push(value);

                if (i == startBlockNumber - blockCount) {
                    wsClient.sendUTF(JSON.stringify(fetchedBlocks));
                }
            })
        }
    });
};

exports.returnInvalidInput = (wsClient) => {
    wsClient.sendUTF("Invalid path.");
}
