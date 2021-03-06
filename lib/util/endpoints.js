module.exports = {
  getChannel: id => ({endpoint: `/channels/${id}`, method: 'GET'}),
  modifyChannel: id => ({endpoint: `/channels/${id}`, method: 'PATCH'}),
  deleteChannel: id => ({endpoint: `/channels/${id}`, method: 'DELETE'}),
  getChannelMessages: id => ({endpoint: `/channels/${id}/messages`, method: 'GET'}),
  getChannelMessage: (channelId, messageId) => ({endpoint: `/channels/${channelId}/messages/${messageId}`, method: 'GET'}),
  createMessage: channelId => ({endpoint: `/channels/${channelId}/messages`, method: 'POST'}),
  createReaction: (chId, mesId, emoji) =>  ({endpoint: `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`, method: 'PUT'}),
  deleteReaction: (chId, mesId, emoji, userId) =>  ({endpoint: `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`, method: 'DELETE'}),
  getReactions:  (chId, mesId, emoji) => ({endpoint: `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`, method: 'GET'}),
  deleteAllReactions:  (chId, mesId, emoji) => ({endpoint: `/channels/${channelId}/messages/${messageId}/reactions`, method: 'DELETE'}),
  editMessage: (chId, mesId) => ({endpoint: `/channels/${chId}/messages/${mesId}`, method: 'PATCH'}),
  deleteMessage: (chId, mesId) => ({endpoint: `/channels/${chId}/messages/${mesId}`, method: 'DELETE'}),
  bulkDeleteMessages: chId => ({endpoint: `/channels/${chId}/messages/bulk-delete`, method: 'POST'}),
  editChannelPermission: (chId, overwriteId) => ({endpoint: `/channels/${chId}/permissions/${overwriteId}`, method: 'PUT'}),
  getChannelInvites: id => ({endpoint: `/channels/${id}/invites`, method: 'GET'}),
  createChannelInvite: id => ({endpoint: `/channels/${channelId}/invites`, method: 'POST'}),
  deleteChannelPermission: (chId, overwriteId) => ({endpoint: `/channels/${chId}/permissions/${overwriteId}`, method: 'DELETE'}),
  triggerTyping: chId => ({endpoint: `/channels/${chId}/typing`, method: 'POST'}),
  getPinnedMessages: id => ({endpoint: `/channels/${id}/pins`, method: 'GET'}),
  addPinnedMessage: (chId, mesId) => ({endpoint: `/channels/${chId}/pins/${mesId}`, method: 'PUT'}),
  deletePinnedMessage: (chId, mesId) => ({endpoint: `/channels/${chId}/pins/${mesId}`, method: 'DELETE'}),
  dmAddRecipient: (chId, userId) => ({endpoint: `/channels/${chId}/recipients/${userId}`, method: 'PUT'}),
  dmRemoveRecipiend: (chId, userId) => ({endpoint: `/channels/${chId}/recipients/${userId}`, method: 'DELETE'})
};