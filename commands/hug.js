const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'hug',
  description: 'Hugs a person you mention',
  type: 'Fun',
  async execute(client, msg, args) {
    const user = msg.mentions.users.first() || msg.author
    const kiss = await (await fetch(`https://nekos.life/api/v2/img/hug`)).json()
    msg.channel.send(new Discord.MessageEmbed()
                                .setImage(kiss.url)
                                .setFooter(user == msg.author ? `${msg.author.username} hugs themselves.` : `${msg.author.username} hugs ${user.username}`))
  }
}
