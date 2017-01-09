'use strict';
const WebSocket = require('uws');
const functions = require('./gatewayFunctions')

class Gateway {
  constructor(client) {
    this.client = client;
    this.connect();
  }

  connect() {
    this.client.callApi('/gateway/bot', (err, res) => {
      this.ws = new WebSocket(res.url + '/?encoding=json&v=6');
      this.registerEventListeners();
    });
  }

  registerEventListeners() {
    this.ws.on('open', () => {
      if (!this.client.token)
        this.disconnect();

      this.client.emit('ws_open');
    });

    this.ws.on('message', evt => {
      this.client.emit('_', evt);
      let data = JSON.parse(evt);
      if (data.s)
        this.sequenceNumber = data.s;
      if (evt.t === 'READY')
        this.sessionId = evt.d.session_id;
      let func = functions[data.op];
      if (func) func(data, this);
      if (data.op === 0) this.client.emit(data.t, data.d);
    });

    this.ws.on('error', e => {
      this.client.emit('ws_error', e);
    });

    this.ws.on('close', code => {
      this.client.emit('ws_close', code);
      this.connect();
    });
  }

  disconnect() {
    this.ws.close();
  }

  bringToLife(int) {
    setInterval(() => {
      this.ws.send(JSON.stringify({
        op: 1,
        d: this.sequenceNumber
      }));
    }, int);
  }

  sendHandshake() {
    let handshake = {
      token: this.client.token,
      properties: {
        os: process.platform,
        browser: "Masamune",
        device: "Masamune"
      },
      compress: false,
      large_threshold: 250
    }

    this.ws.send(JSON.stringify({ op: 2, d: handshake }));
  }

  send(op, d) {
    this.ws.send({op, d});
  }
}

module.exports = Gateway;