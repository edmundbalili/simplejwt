const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema ({
  token: { type: String }
});

module.exports = mongoose.models.BlacklistedToken || mongoose.model('BlacklistedToken', tokenSchema, 'blacklistedtokens');
