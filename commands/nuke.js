const Discord = require('discord.js')

module.exports = {
  name: 'nuke',
  description: 'Nuke a channel!',
  type: 'Moderation',
  permissionsLevel: 'Server Moderator',
  args: true,
  usage: '<channel>',
  example: '#example',
  async execute(client, msg, args) {
    const channel = msg.mentions.channels.first()
    if(!channel) return msg.channel.send(`Not a valid channel. Please use a valid channel`)
    channel.delete().then(() => {
      msg.guild.channels.create(channel.name, {
        type: 'text',
        topic: channel.topic || '',
        nsfw: channel.nsfw,
        parent: channel.parent,
        permissionOverwrites: channel.permissionOverwrites,
        position: channel.position,
        rateLimitPerUser: channel.rateLimitPerUser,
        reason: 'Restore after nuke. - Love, Ava'
      })
    })
  }
}
