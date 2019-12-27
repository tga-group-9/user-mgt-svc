const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  username: { type: String, required : true },
  password: { type: String, required : true },
  badge: { type: String, default: 'NA' },
  createdAt: { type: Date, default: Date.now() }
});
    
module.exports = mongoose.model('user', UserSchema);
