const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('parse-ms')

module.exports = {
  name: 'daily',
  description: 'Claim your daily Eris from Ava.',
  async execute(client, msg, args) {
    let prefix = 'a!'
    let timeout = 86400000 // 24 hours in milliseconds.
    let amount = Math.floor(Math.random() * 300) + 1

    let daily = await db.get(`user_${msg.guild.id}_${msg.author.id}.daily`)

    if(daily != null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily))
      return msg.channel.send(`You've already collected your daily Eris. You may choose to collect it again in **${time.hours}h ${time.minutes}m ${time.seconds}s**.`)
    }
    let dailyEmbed = new Discord.MessageEmbed()
    .setAuthor(`Daily Eris`, msg.member.user.avatarURL({ size: 512, dynamic: true }))
    .setColor("#8074d2")
    .setDescription(`**Daily Eris!** You can check your Eris balance by using ${prefix}bal`)
    .addField(`Collected`, amount)

    msg.channel.send(dailyEmbed)
    db.add(`user_${msg.guild.id}_${msg.author.id}.bal`, amount)
    db.set(`user_${msg.guild.id}_${msg.author.id}.daily`, Date.now())
  }
}
