const Discord = require('discord.js')

module.exports = {
  name: 'simp',
  description: 'Look like someone is a simp!',
  type: 'Fun',
  args: true,
  usage: '@<the simp>',
  async execute(client, msg, args) {
    const target = msg.mentions.members.first()
    msg.channel.send(`**${target.nickname || target.user.username}** was seen simping on ***${new Date().toDateString()}***. The simp beheading will begin shortly.`)
  }
}
