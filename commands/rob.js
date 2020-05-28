const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'rob',
  description: 'Rob a user of their Eris!',
  aliases: ['steal'],
  args: true,
  usage: '@<user to rob>',
  cooldown: 60,
  type: 'Currency',
  async execute(client, msg, args) {
    let user = msg.mentions.members.first()
    let target = await db.get(`user_${msg.guild.id}_${user.id}.bal`) // mentioned user's balance
    let author = await db.get(`user_${msg.guild.id}_${msg.author.id}.bal`) // author's balance

    if(user == msg.member) {
      return msg.channel.send(`Wow. Got a guy from another world huh? Look, you can't rob yourself ya dunce.`)
    }
    if(author < 250) {
      return msg.channel.send(`:confounded: You need a least 250 Eris to rob somebody.`)
    }

    if(target <= 0 && target <= 200) {
      return msg.channel.send(`${user.user.username} doesn't have enough Eris to rob.`)
    }

    let random = Math.floor(Math.random() * 200) + 1
    let chance = Math.random() < 0.4

    if(chance) {
      let hasLessThan = author < 100
      msg.channel.send(`${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username}, looks like you were caught by the police and had to pay bail. (${hasLessThan ? `*${author} Eris Lost*` : "*100 Eris Lost*"})`)
      return db.subtract(`user_${msg.guild.id}_${msg.author.id}.bal`, author > 2500 ? (Math.floor(Math.random() * 500) + 1) : hasLessThan ? author : 100)
    }

    let robEmbed = new Discord.MessageEmbed()
    .setDescription(`${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username}, you robbed ${typeof user.nickname == "string" ? user.nickname : user.user.username} and got away with it!`)
    .addField(`Loot`, `${random} Eris`)
    .setTimestamp()
    .setColor('#8074d2')
    msg.channel.send(robEmbed)

    db.subtract(`user_${msg.guild.id}_${user.id}.bal`, random)
    db.add(`user_${msg.guild.id}_${msg.author.id}.bal`, random)
  }
}
