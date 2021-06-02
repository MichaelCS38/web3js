const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/0203d78779ed4c379f52d14d09acd7e3')

const Tx = require('ethereumjs-tx').Transaction;
const Account = require('./models/account');
const db = require('./config/database')

// kết nối db
db.connect();

// transaction
var send = function(addSend,addReceive,priKeySend){
    web3.eth.getTransactionCount(addSend, (err, txCount) => {
        // khởi tạo transaction
        const txObj = {
            nonce: web3.utils.toHex(txCount),
            to: addReceive,
            value: web3.utils.toHex(web3.utils.toWei('0.5', 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }
    
        //đăng kí transaction
        const tx = new Tx(txObj, {chain: 'ropsten', hardfork: 'petersburg'})
        tx.sign(priKeySend)
        const serializedTransaction = tx.serialize();
        const raw = '0x' + serializedTransaction.toString('hex')
    
        // gửi transaction đã đăng kí
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            if (err) {
                console.error(err)
                return
                }
            console.log('Success!!! ====> txHash : ', txHash);
            })
    })
}

// getdata from mongodb
Account.find({}, function (err, account) {
    var addSend = account[0].address;
    var addReceive = account[1].address;
    var priKeySend = Buffer.from(account[0].privatekey, 'hex');
    
    send(addSend,addReceive,priKeySend);

});
