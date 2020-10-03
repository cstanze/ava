module.exports = {
  name: 'announce',
  description: 'Make an announcement to a channel!',
  type: 'Utility',
  permissionsLevel: 'Server Administrator',
  args: true,
  usage: '<channel> <message>',
  example: '#oniichan Hi Everybody!',
  async execute(client, msg, args) {
    const channel = msg.mentions.channels.first()
    args.shift()
    const message = args.join(' ')
    if(!channel || !message) return msg.channel.send(`You may be missing a channel/message.`)
    channel.send(message)
  }
}
