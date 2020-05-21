const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'rob',
  description: 'Rob a user of their Eris!',
  aliases: ['steal'],
  args: true,
  usage: '@<user to rob>',
  cooldown: 120,
  async execute(client, msg, args) {
    let user = msg.mentions.members.first()
    let target = await db.get(`user_${msg.guild.id}_${user.id}.bal`) // mentioned user's balance
    let author = await db.get(`user_${msg.guild.id}_${msg.author.id}.bal`) // author's balance

    if(author < 250) {
      return msg.channel.send(`:confounded: You need a least 250 Eris to rob somebody.`)
    }

    if(target <= 0 && target <= 200) {
      return msg.channel.send(`${user.user.username} doesn't have enough Eris to rob.`)
    }

    let random = Math.floor(Math.random() * 200) + 1
    let chance = Math.random() < 0.4

    if(chance) {
      let hasLessThan = author < 50
      msg.channel.send(`${typeof user.nickname == "string" ? user.nickname : user.user.username}, looks like you were caught by the police and had to pay bail. (${hasLessThan ? `*${author} Eris Lost*` : "*50 Eris Lost*"})`)
      return db.subtract(`money_${msg.author.id}`, hasLessThan ? author : 50)
    }

    let robEmbed = new Discord.MessageEmbed()
    .setDescription(`${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username} you robbed ${typeof user.nickname == "string" ? user.nickname : user.user.username} and got away with it!`)
    .addField(`Loot`, `${random} Eris`)
    .setTimestamp()
    .setColor('#8074d2')
    msg.channel.send(robEmbed)

    db.subtract(`user_${msg.guild.id}_${user.id}.bal`, random)
    db.add(`user_${msg.guild.id}_${msg.author.id}.bal`, random)
  }
}
