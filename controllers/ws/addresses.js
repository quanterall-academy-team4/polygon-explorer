const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.returnAccountBalance = (WSClient, address) => {
    web3.eth.getBalance(address).then(value => {
        WSClient.sendUTF(JSON.stringify(value));
    });
};
