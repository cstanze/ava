let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]
const Discord = require('discord.js')

module.exports = {
  name: 'avatar',
  description: 'Get your current avatar',
  type: 'Image',
  aliases: ['icon', 'pfp'],
  execute(client, msg, args) {
    const user = msg.mentions.users.first() || msg.author
    let avatarEmbed = new Discord.MessageEmbed()
		.setColor('#14c49e')
		.setTitle(randomGivers[Math.floor(Math.random() * randomGivers.length)])
		.setImage(user.avatarURL({ size: 512, dynamic: true }))
		.setTimestamp()
		.setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)], null)
		msg.channel.send(avatarEmbed)
  }
}
