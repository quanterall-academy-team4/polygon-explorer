const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.getTransactionsByHash = (req, res) => {
    web3.eth.getTransaction(req.params.hash).then((value) => {
        res.json(value);
    })
};

exports.getPendingTransactions = (req, res) => {
    web3.eth.getPendingTransactions().then((value) => {
        res.json(value);
    })
};

exports.getTransactionsByAddress = (req, res) => {
    web3.eth.getTransactionCount(req.params.address).then((value) => {
        res.json(value);
    })
};

// optimize
exports.getLatestTransaction = (req, res) => {
    web3.eth.getBlock('latest', true, () => {}).then(value => {
        const transactionsCount = value.transactions.length - 1; // last TX
        const blockNumber = value.number;

        web3.eth.getTransactionFromBlock(blockNumber, transactionsCount).then(value => {
            res.json(value);
        });
    });
};

