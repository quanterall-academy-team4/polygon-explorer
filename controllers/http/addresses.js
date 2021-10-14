const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.getAccountBalance = (req, res) => {
    web3.eth.getBalance(req.params.address).then(value => {
        res.end(web3.utils.fromWei(value));
    });
};
