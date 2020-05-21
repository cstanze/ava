const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
  name: 'work',
  description: 'Work for Eris!',
  cooldown: 30,
  type: 'Currency',
  async execute(client, msg, args) {
    let amount = Math.floor(Math.random() * 350) + 1 // 1-350 random Eris
    let workEmbed = new Discord.MessageEmbed()
    .setAuthor(`${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username} - Work`, msg.member.user.avatarURL({ size: 512, dynamic: true }))
    .setDescription(`Looks like your work payed off!\n${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username}, you earned a fair amount of Eris doing work!`)
    .addField(`Work Reward`, `${amount} Eris`)
    .setColor('#8074d2')

    msg.channel.send(workEmbed)
    db.add(`user_${msg.guild.id}_${msg.author.id}.bal`, amount)
  }
}
