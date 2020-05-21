const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
  name: 'pay',
  description: 'Pay other people some Eris!',
  aliases: ['transfer', 'transferEris', 'erisTransfer'],
  args: true,
  usage: '@<user to pay> <amount>',
  cooldown: 10,
  async execute(client, msg, args) {
    let user = msg.mentions.members.first()
    let member = await db.get(`user_${msg.guild.id}_${msg.member.id}.bal`)
    let target = await db.get(`user_${msg.guild.id}_${user.id}.bal`)

    if(!user) {
      msg.channel.send(`You didn\'t provide any arguments, ${msg.author}\nThis is the expected usage: \`${msg.prefix}pay @<user to pay> <amount>\`\nDon't forget, the usage is strict and you need to mention the user before adding the amount of Eris you want to transfer`)
      return msg.channel.send(`You forgot to mention somebody to send Eris to.`)
    }

    if(!args[1]) {
      msg.channel.send(`You didn\'t provide any arguments, ${msg.author}\nThis is the expected usage: \`${msg.prefix}pay @<user to pay> <amount>\`\nDon't forget, the usage is strict and you need to mention the user before adding the amount of Eris you want to transfer`)
      return msg.channel.send(`Please specify an amount to transfer.`)
    }

    if(msg.content.includes('-')) {
      return msg.channel.send(`You Can't pay negative Eris to a person. That would be mean.`)
    }

    if(member < 0) {
      return msg.channel.send(`You have 0 Eris, get some Eris with ${msg.prefix}work`)
    }

    if(member < args[0]) {
      return msg.channel.send(`Hmm... Looks like you don't have enough Eris in your account to transfer this much...`)
    }
    let payEmbed = new Discord.MessageEmbed()
    .setColor('#8074d2')
    .setTimestamp()
    .setDescription(`${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username} successfully paid ${typeof user.nickname == "string" ? user.nickname : user.user.username}`)
    .addField(`${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username}\'s Balance`, `${member - args[1]} Eris`)
    .addField(`${typeof user.nickname == "string" ? user.nickname : user.user.username}\'s Balance`, `${target == null ? args[1] : target + args[1]} Eris`)
    msg.channel.send(payEmbed)
    db.add(`user_${msg.guild.id}_${user.id}.bal`, args[1])
    db.subtract(`user_${msg.guild.id}_${msg.member.id}.bal`, args[1])
  }
}
