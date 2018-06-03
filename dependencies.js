class Dependencies {
  constructor() {
    this.express = require('express');
    this.path = require('path');
    this.bodyParser = require('body-parser');
    this.mongoose = require('mongoose');
    this.path = require('path');
  }

  setupApp() {
    return this.express();
  }

  connectToDatabase(env) {
    return this.mongoose.connect(databaseSetup(env));
  }

}

function databaseSetup(env) {
  return env === "test" ? 'mongodb://localhost:27017/blockchain_test' : 'mongodb://localhost:27017/blockchain_production';
}

module.exports = new Dependencies();