const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.getBlockByNumberOrHash = (req, res) => {
    web3.eth.getBlock(req.params.arg, true, (error, result) => { // TO DO: handle error
    }).then(value => {
        res.json(value);
    });
};

exports.getLatestBlock = (req, res) => {
    web3.eth.getBlock('latest', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        res.json(value);
    });
}

exports.getMultipleBlocksAfterThreshold = (req, res) => {
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
    })
};

