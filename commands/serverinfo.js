const Discord = require('discord.js')
const moment = require('moment')
require('moment-duration-format')

module.exports = {
  name: 'serverinfo',
  description: 'Get info on the server running Ava!',
  type: 'Misc',
  execute(client, msg, args) {
    let info = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle('Server Info')
			.setAuthor(`NodeJS ${require('child_process').execSync('node -v').toString()}`, 'https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
			.setDescription(`Current [NodeJS](https://nodejs.org) Version: ${require('child_process').execSync('node -v').toString()}`)
			.addFields(
        { name: 'Mem Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} MB`, inline: true},
        { name: 'Uptime', value: `${moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]")}`, inline: true},
        { name: 'Users', value: `${client.users.cache.size.toLocaleString()}`, inline: true,},
        { name: 'Servers', value: `${client.guilds.cache.size.toLocaleString()}`, inline: true},
        { name: 'Channels', value: `${client.channels.cache.size.toLocaleString()}`, inline: true},
        { name: 'Discord.js', value: Discord.version, inline: true},
        { name: 'Node', value: `${process.version}`, inline: true}
			)
			.setThumbnail('https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
			.setTimestamp()
			.setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)], 'https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
		msg.channel.send(info)
  }
}
