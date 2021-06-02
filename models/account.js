const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Account = new Schema({
    address: {type: String, required: true},
    privatekey: {type: String},
    name: {type: String}
  });

  module.exports = mongoose.model('Account', Account);
