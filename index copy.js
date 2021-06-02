var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/0203d78779ed4c379f52d14d09acd7e3')

const add2 = '0x40209Ce6b8f59554bC68712c6f01e0a5517B9c51'
const add1 = '0x174b898802A37E93030C4d3E63f4df4A1AAd99Ff'
var priKey1 = Buffer.from('433579269da9957455a5477e2f909143f9ed2577a5bb0fd9c897aee24e93e517', 'hex');

// web3.eth.getBalance(add1, (err, bal) => {
//     console.log('add1 balance old: ', web3.utils.fromWei(bal, 'ether'))
// })

web3.eth.getTransactionCount(add1, (err, txCount) => {

    // create transaction
    const txObj = {
        nonce: web3.utils.toHex(txCount),
        to: add2,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    //Sign transaction
    const tx = new Tx(txObj, {chain: 'ropsten', hardfork: 'petersburg'})
    tx.sign(priKey1)
    const serializedTransaction = tx.serialize();
    const raw = '0x' + serializedTransaction.toString('hex')

    // send transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) {
            console.error(err)
            return
            }
        console.log('Success!!! ====> txHash : ', txHash);
        })
})
