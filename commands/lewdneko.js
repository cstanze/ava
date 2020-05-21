const akaneko = require('akaneko')
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
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
  	 .setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
  	msg.channel.send(hentaiEmbed)
  }
}
