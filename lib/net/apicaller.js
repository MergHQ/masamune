'use strict';
const https = require('https');

class ApiCaller {
  constructor(client) {
    this.client = client;
  }

  makeRequest(requestOpts, body, cb) {
    let request = null;

    if (typeof body === 'function')
      cb = body; 

    let headers = {
      Authorization: this.client.token,
      'User-Agent': 'DiscordBot (https://github.com/MergHQ/Masamune, 1.0)',
    }

    if (requestOpts && typeof requestOpts === 'object') {
      if (typeof body === 'object') {
        headers['Content-Type'] = !body.contentType ? 'application/json' : body.contentType;
      }

      request = https.request({
        method: !requestOpts.method ? 'GET' : requestOpts.method,
        host: 'discordapp.com',
        path: '/api' + requestOpts.endpoint,
        headers
      });
    } else if (requestOpts && typeof requestOpts === 'string') {
      request = https.request({
        method: 'GET',
        host: 'discordapp.com',
        path: '/api' + requestOpts,
        headers
      });
    }

    request.once('abort', () => {
      cb && cb(new Error('Request aborted.'));
    });

    request.once('error', e => {
      cb && cb(e);
      request.abort();
    });

    request.once('response', res => {
      let responseData = '';
      res.on('data', data => {
        responseData += data;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          cb && cb(new Error('Request failed, status code: ' + res.statusCode));
        }

        if (res.headers['content-type'] === 'application/json') {
          cb && cb(null, JSON.parse(responseData));
        }
      });
    });

    if (typeof body === 'object')
      request.end(headers['Content-Type'] === 'application/json' ? JSON.stringify(body.data) : body.data);
    else
      request.end();
  }
}

module.exports = ApiCaller;