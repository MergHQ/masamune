'use strict';
const EventEmitter = require('events');
const ApiCaller = require('./net/apicaller');
const Gateway = require('./net/gateway');

class Client extends EventEmitter {
  constructor(token, bot) {
    super();
    this.token = token.startsWith('Bot ') ? token : (bot === false ? token : 'Bot ' + token);
    this.apiCaller = new ApiCaller(this);
    this.gateway = new Gateway(this);
  }

  callApi(request, body, cb) {
    this.apiCaller.makeRequest(request, body, cb);
  }
}

module.exports = Client;