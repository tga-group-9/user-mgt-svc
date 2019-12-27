const mongoose = require('mongoose');
const config = require('../config/config');

const db = mongoose.connect(config.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true  }, (error) => {
  if (error) {
    console.log('user-mgt-svc db connection error----', error);
    throw (error);
  } else {
    console.log('user-mgt-svc db connected....');
  }
});

module.exports = db;
