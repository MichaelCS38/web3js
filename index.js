const Web3 = require("web3");
const ABItoken = require("./abiTOKEN");
const ApiCall = require('./NodejsCallApi')
const http = require('http')

//MAINET

// const web3 = new Web3("https://bsc-dataseed1.binance.org:443");
// const BNUtoken = "0x4954e0062e0a7668a2fe3df924cd20e6440a7b77";

//TESTNET
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const BNUtoken = "0x73fC7eB8313943243A39c01077154a571437ea6D";

const PRIVATE_KEY =
  "433579269da9957455a5477e2f909143f9ed2577a5bb0fd9c897aee24e93e517";

http.createServer((req, res) =>{
    ApiCall.callAPI(function(response){
        res.write(JSON.stringify(response));
        res.end();
    })
})

const sendTokenBEP20 = function (addReceive, amount) {
  const account = web3.eth.accounts.privateKeyToAccount("0x" + PRIVATE_KEY);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  const accountTemp = account.address;

  const contractBEP20 = new web3.eth.Contract(ABItoken, BNUtoken, {
    from: accountTemp,
  });
  const parseAmount = web3.utils.toWei((amount * 1e18).toString(), "wei");

  contractBEP20.methods
    .transfer(addReceive, parseAmount)
    .send({ from: accountTemp, gas: 2000000 })
    .on("transactionHash", (tx) => {


      console.log(tx);
    })
};

sendTokenBEP20("0x2b2512B318785aE77e014ab413855fA60F805fFA", 10);
