let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
const Discord = require('discord.js')

module.exports = {
  name: 'changelog',
  description: 'Ava Changelog',
  execute(client, msg, args) {
    let changelog = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Changelog')
			.attachFiles(['./AvaIcon.jpg'])
			.setAuthor(`Ava ${versionString} ${channelName}`, 'attachment://AvaIcon.jpg')
			//.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ size: "128", dynamic: true, format: "png" }))
			.setDescription(`Current Ava Version: ${versionString}`)
			.addFields(
				{ name: `v1.0.0 ${channelName}`, value: 'First Release!' },
				{ name: `v1.1.0 ${channelName}`, value: 'Added New Commands!' },
				{ name: `v1.3.0 ${channelName}`, value: '[Pretty Big Update](https://google.com/search?q=site+work+in+progress+check+back+later)' },
				{ name: `v1.4.0 ${channelName}`, value: 'Added uwuify Command. Added informal changelog' },
				{ name: `v1.4.3 ${channelName}`, value: 'Changed how the starboard functioned' },
				{ name: `v1.4.6 ${channelName}`, value: 'Added advanced image/gif support for starboard' },
				{ name: `v1.5.0 ${channelName}`, value: 'Upgraded to embed changelog.' },
				{ name: `v1.6.0 ${channelName}`, value: 'Bug fixes. Like alot!' },
				{ name: `v1.7.0 ${channelName}`, value: 'In a new server!' },
				{ name: `v1.7.9 ${channelName}`, value: 'Even more bug fixes.' },
				{ name: `v1.8.0 ${channelName}`, value: 'Added the \"hall-of-sin\" for a custom server!' },
				{ name: `v1.9.0 ${channelName}`, value: 'Fixed the starboard image/gif support.' }
			)
			.setThumbnail('attachment://AvaIcon.jpg')
			.setTimestamp()
			.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
		msg.channel.send(changelog)
  }
}
