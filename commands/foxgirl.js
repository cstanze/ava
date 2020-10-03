const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'foxgirl',
  description: 'Gets an image of a fox girl.',
  type: 'Fun',
  async execute(client, msg, args) {
    const fg = await (await fetch(`https://nekos.life/api/v2/img/fox_girl`)).json()
    msg.channel.send(new Discord.MessageEmbed()
                                .setImage(fg.url)
                                .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)]))
  }
}
