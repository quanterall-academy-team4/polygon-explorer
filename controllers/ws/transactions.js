const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.returnLatestTransaction = (WSClient) => {
    web3.eth.getBlock('latest', true, () => {}).then(value => {
        const transactionsCount = value.transactions.length - 1; // last TX
        const blockNumber = value.number;

        web3.eth.getTransactionFromBlock(blockNumber, transactionsCount).then(value => {
            WSClient.sendUTF(JSON.stringify(value));
        });
    });
};

exports.returnTransactionByHash = (WSClient, hash) => {
    web3.eth.getTransaction(hash).then((value) => {
        WSClient.sendUTF(JSON.stringify(value));
    })
};

exports.returnPendingTransactions = (WSClient) => {
    web3.eth.getPendingTransactions().then((value) => {
        WSClient.sendUTF(JSON.stringify(value));
    })
};

exports.returnTransactionsCountByAddress = (WSClient, address) => {
    web3.eth.getTransactionCount(address).then((value) => {
        WSClient.sendUTF(JSON.stringify(value));
    })
};