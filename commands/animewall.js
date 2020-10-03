const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'animewall',
  description: 'Get an anime wallpaper!',
  type: 'Search',
  async execute(client, msg, args) {
    const user = msg.mentions.users.first() || msg.author
    const kiss = await (await fetch(`https://nekos.life/api/v2/img/wallpaper`)).json()
    msg.channel.send(new Discord.MessageEmbed()
                                .setImage(kiss.url)
                                .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)]))
  }
}
