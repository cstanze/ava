const Discord = require('discord.js')
const db = require('quick.db')
const chalk = require('chalk')

module.exports = {
  name: 'warn',
  description: 'Warn the mentioned user for a given reason.',
  args: true,
  usage: '@<user to warn> <reason>',
  example: '@User Stop spamming in the general channel',
  type: 'Moderation',
  permissionsLevel: 'Server Moderator',
  async execute(client, msg, args) {
    const warnings = await db.get(`user_${msg.guild.id}_${msg.author.id}.warnings`)
    const target = msg.mentions.members.first() || args[0]
    args[1] = args.slice(1).join(' ')
    const reason = args[1] || "NXP"
    if(reason == "NXP") {
      msg.channel.createWebhook(`${msg.member.nickname ? msg.member.nickname : msg.author.username}`, { avatar: msg.member.user.avatarURL({ size: 512, dynamic: true }) }).then(async wh => {
        await wh.send(`I don't know how to correctly warn someone. Maybe I should use \`${msg.prefix}help warn\` to find out how to use this command...`)
        wh.delete()
      })
      return
    }
    target.user.send(`You've been warned in: **${msg.guild.name}**.\nReason: ${reason}`)
      .then(() => {
        msg.channel.send(`I've warned **${target.nickname || target.user.username}** for ***${reason}***`)
      })
      .catch(err => {
        console.error(`Could not send warn DM to ${msg.author.tag}.\n`, err)
        msg.channel.send('It seems as though I couldn\'t DM the person to warn. They most likely have DMs disabled.')
      })
    if(typeof warnings == 'undefined') return db.set(`user_${msg.guild.id}_${msg.author.id}.warnings`, [{ reason: reason }])
    db.push(`user_${msg.guild.id}_${msg.author.id}.warnings`, { reason: reason })
  }
}
