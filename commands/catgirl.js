const Discord = require('discord.js')
const akaneko = require('akaneko')
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]

module.exports = {
  name: 'catgirl',
  description: 'catgiww/neko uwu',
  aliases: ['neko'],
  cooldown: 4,
  type: 'Image',
  execute(client, msg, args) {
    const nekoEmbed = new Discord.MessageEmbed()
    .setColor('#8074d2')
    .setImage(akaneko.neko())
    .setTitle("")
    .setTimestamp()
    .setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
    msg.channel.send(nekoEmbed)
  }
}
