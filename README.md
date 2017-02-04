# masamune
***Another*** lightweight discord API wrapper for Node.js, mainly used by my public bot.

This reponds to `Hello!` with `Hello :username`.
```javascript
const Masamune = require('masamune');
const client = new Masamune.Client('token');

client.on('MESSAGE_CREATE', msg => {
  if (msg.content === 'Hello!')
    client.callApi(Masamune.Endpoints.createMessage(msg.channel_id, 
      {data: { content: `Hello ${msg.author.username}`}});
});

```
