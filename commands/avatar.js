let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]
const Discord = require('discord.js')

module.exports = {
  name: 'avatar',
  description: 'Get your current avatar',
  type: 'Misc',
  aliases: ['icon', 'pfp'],
  execute(client, msg, args) {
    let avatarEmbed = new Discord.MessageEmbed()
		.setColor('#14c49e')
		.setTitle(randomGivers[Math.floor(Math.random() * randomGivers.length)])
		.setImage(msg.member.user.avatarURL({ size: 512, dynamic: true }))
		.setTimestamp()
		.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
		msg.channel.send(avatarEmbed)
  }
}
