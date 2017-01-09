module.exports = {
  10: (data, gateway) => {
    gateway.bringToLife(data.d.heartbeat_interval);
    gateway.sendHandshake();
  }
}