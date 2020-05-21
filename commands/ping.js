module.exports = {
  name: 'ping',
  description: 'Ping!',
  type: 'Utility',
  execute(client, msg, args) {
    msg.channel.send('pong!\n'+`\`${client.ws.ping}ms\` heartbeat ping`)
  }
}
