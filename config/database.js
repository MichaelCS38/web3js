const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Test_web3js', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connect succsess!!!");

    } catch (error) {
        console.log("Fall!!");
    }
}

module.exports = { connect };

