const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'baka',
  description: 'Calls a person you mention an idiot',
  type: 'Search',
  async execute(client, msg, args) {
    const user = msg.mentions.users.first() || msg.author
    const baka = await (await fetch(`https://nekos.life/api/v2/img/baka`)).json()
    msg.channel.send(new Discord.MessageEmbed()
                                .setImage(baka.url)
                                .setFooter(user == msg.author ? `${msg.author.username} calls themselves an idiot` : `${msg.author.username} calls ${user.username} an idiot`))
  }
}
