const db = require('quick.db')
const Discord = require('discord.js')
const chalk = require('chalk')

module.exports = {
  name: 'leaderboard',
  description: 'Gets a leaderboard of members who have the most Eris.',
  aliases: ['top'],
  cooldown: 5,
  type: 'Currency',
  async execute(client, msg, args) {
    let money = await db.startsWith(`user_${msg.guild.id}`).sort((u1, u2) => u2.data.bal - u1.data.bal)
    let content = ""
    for(let i=0;i<(money.length < 10 ? money.length : 10);i++) {
      let user = await msg.guild.members.fetch(money[i].ID.split('_')[2])
      content += `**${i+1}.**   ${typeof user.nickname == "string" ? user.nickname : user.user.username} ~\\~ ${money[i].data.bal.toFixed(0)} Eris\n`
    }
    const topEmbed = new Discord.MessageEmbed()
    .setAuthor(`${msg.guild.name} - Leaderboard`, msg.guild.iconURL({ size: 512, dynamic: true }))
    .setDescription(content == "" ? `Hmm... There seems to be no leaderboard stats for this guild.\nStart gaining Eris with ${msg.prefix}work or ${msg.prefix}daily` : content)
    .setColor('#8074d2')
    .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
    .setTimestamp()
    msg.channel.send(topEmbed)
  }
}
