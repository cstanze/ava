let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
const Discord = require('discord.js')

module.exports = {
  name: 'serverinfo',
  description: 'Get info on the server running Ava!',
  execute(client, msg, args) {
    let info = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle('Server Info')
			.setAuthor(`NodeJS ${require('child_process').execSync('node -v').toString()}`, 'https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
			.setDescription(`Current [NodeJS](https://nodejs.org) Version: ${require('child_process').execSync('node -v').toString()}`)
			.addFields(
				{ name: 'Server CPU', value: `${require('child_process').execSync('sysctl -n machdep.cpu.brand_string').toString()}` }
			)
			.setThumbnail('https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
			.setTimestamp()
			.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], 'https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
		msg.channel.send(info)
  }
}
