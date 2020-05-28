const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'level',
  description: 'Find out the level of your user profile for your guild.',
  type: 'Leveling',
  cooldown: 5,
  usage: '@<guild member> (Optional)',
  aliases: ['rank'],
  async execute(client, msg, args) {
    const target = msg.mentions.members.first() || msg.member
    const xp = await db.get(`user_${msg.guild.id}_${msg.author.id}.xp`)
    const level = Math.floor(xp / 200)
    return msg.channel.send(`${target.nickname || target.user.username}, you have \`${xp}xp\`. You are on level \`${level}\`!\nYou need \`${((level + 1) * 200) - xp}xp\` to reach level \`${level + 1}\``)
  }
}
