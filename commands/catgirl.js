const Discord = require('discord.js')
const akaneko = require('akaneko')

module.exports = {
  name: 'catgirl',
  description: 'catgiww/neko uwu',
  aliases: ['neko'],
  cooldown: 4,
  execute(client, msg, args) {
    const nekoEmbed = new Discord.MessageEmbed()
    .setColor('#8074d2')
    .setImage(akaneko.neko())
    msg.channel.send(nekoEmbed)
  }
}
