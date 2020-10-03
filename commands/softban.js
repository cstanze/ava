module.exports = {
  name: 'softban',
  description: 'Bans a member, then unbans them. Clears 7 days of messages',
  type: 'Moderation',
  args: true,
  usage: '<@member>',
  example: '@User',
  permissionsLevel: 'Server Moderator',
  async execute(client, msg, args) {
    const member = msg.mentions.members.first()
    if(!member) return msg.channel.send(`You need to mention a member!`)
    member.ban().then(m => {
      msg.guild.members.unban(m)
      msg.channel.send(`Softbanned ${m.user.username}!`)
    })
  }
}
