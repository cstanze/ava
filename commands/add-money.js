const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
  name: 'add-money',
  description: 'Generate some Eris from thin air.',
  args: true,
  usage: '@<user to pay> <amount>',
  cooldown: 10,
  type: 'Private',
  permissionsLevel: 'Bot Admin',
  aliases: ['generate_eris', 'erisgenerate', 'add_money'],
  async execute(client, msg, args) {
    let user = msg.mentions.members.first()
    if(typeof user.user.id == 'undefined') return msg.channel.send(`You either didn't pick a user or the user you picked has an invalid user id.`)
    const target = await db.get(`user_${msg.guild.id}_${user.user.id}.bal`)

    if(!user) {
      msg.channel.send(`You didn\'t provide any arguments, ${msg.author}\nThis is the expected usage: \`${msg.prefix}pay @<user to pay> <amount>\`\nDon't forget, the usage is strict and you need to mention the user before adding the amount of Eris you want to transfer`)
      return msg.channel.send(`You forgot to mention somebody to send Eris to.`)
    }

    if(!args[1] || isNaN(Number(args[1]))) {
      msg.channel.send(`You didn\'t provide any arguments, ${msg.author}\nThis is the expected usage: \`${msg.prefix}pay @<user to pay> <amount>\`\nDon't forget, the usage is strict and you need to mention the user before adding the amount of Eris you want to transfer`)
      return msg.channel.send(`Please specify an amount to transfer.`)
    }
    let payEmbed = new Discord.MessageEmbed()
    .setColor('#8074d2')
    .setTimestamp()
    .setDescription(`${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username} successfully generated and transferred \`${Number(args[1])} Eris\` to ${typeof user.nickname == "string" ? user.nickname : user.user.username}`)
    .addField(`${typeof user.nickname == "string" ? user.nickname : user.user.username}\'s New Balance`, `${target == null ? args[1].toFixed(0) : (target + Number(args[1]).toFixed(0))} Eris`)
    msg.channel.send(payEmbed)
    db.add(`user_${msg.guild.id}_${user.id}.bal`, args[1])
  }
}
