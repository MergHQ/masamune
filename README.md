# masamune
***Another*** lightweight discord API wrapper for Node.js, mainly used by my public bot.

This reponds to `Hello!` with `Hello :username`.
```javascript
const Muramasa = require('muramasa');
const client = new Muramasa.Client('token');

client.on('MESSAGE_CREATE', msg => {
  if (msg.content === 'Hello!')
    client.callApi(Muramasa.Endpoints.createMessage(msg.channel_id, 
      {data: { content: `Hello ${msg.author.username}`}});
});

```
