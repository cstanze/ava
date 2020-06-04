const akaneko = require('akaneko')
const Discord = require('discord.js')

module.exports = {
  name: 'hentai',
  description: 'Get some juicy hentai from r/hentai',
  cooldown: 4,
  nsfw: true,
  type: 'NSFW',
  execute(client, msg, args) {
    let hentaiEmbed = new Discord.MessageEmbed()
  	 .setColor('#8f14c4')
  	 .setTitle("")
  	 .setImage(akaneko.nsfw.hentai())
  	 .setTimestamp()
  	 .setFooter(client.randomNSFWFooters[Math.floor(Math.random() * client.randomNSFWFooters.length)], null)
  	msg.channel.send(hentaiEmbed)
  }
}
