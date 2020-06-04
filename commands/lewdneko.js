const akaneko = require('akaneko')
const Discord = require('discord.js')

module.exports = {
  name: 'lewdneko',
  description: 'neko hentai fow u mashtew uwu',
  aliases:['nekoporn'],
  cooldown: 4,
  nsfw: true,
  type: 'NSFW',
  execute(client, msg, args) {
    let hentaiEmbed = new Discord.MessageEmbed()
  	 .setColor('#8f14c4')
  	 .setTitle("")
  	 .setImage(akaneko.lewdNeko())
  	 .setTimestamp()
  	 .setFooter(client.randomNSFWFooters[Math.floor(Math.random() * client.randomNSFWFooters.length)], null)
  	msg.channel.send(hentaiEmbed)
  }
}
