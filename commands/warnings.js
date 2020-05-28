const Discord = require('discord.js')
const db = require('quick.db')
const chalk = require('chalk')
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]

module.exports = {
  name: 'warnings',
  description: 'List the warnings of a person (limited to 10 warnings)',
  type: 'Moderation',
  usage: '@User (leave blank for getting warnings on yourself)',
  async execute(client, msg, args) {
    let target = msg.mentions.members.first() || msg.member
    let warnings = await db.get(`user_${msg.guild.id}_${msg.author.id}.warnings`)
    let content = ""
    if(typeof warnings[0] != 'undefined') {
      for(let i=0;i<(warnings.length < 10 ? warnings.length : 10);i++) {
        content += `**${i+1}.** Reason: ${warnings[i].reason.length > 67 ? `${warnings[i].reason.substring(0, 67)}...` : warnings[i].reason}\n\n`
      }
    }
    const warnListEmbed = new Discord.MessageEmbed()
    .setAuthor(`${target.nickname || target.user.username} - Warnings`, msg.author.avatarURL({ size: 512, dynamic: true }))
    .setDescription(content == "" ? `There seems to be no warnings for ${target.nickname || target.user.username}.\nGood job at being a great member of ${msg.guild.name}, ${target.nickname || target.user.username}!` : content)
    .setColor('#8074d2')
    .setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)])
    .setTimestamp()
    msg.channel.send(warnListEmbed)
  }
}
