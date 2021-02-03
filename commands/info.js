/* eslint-disable no-undef */
const Discord = require('discord.js')
const moment = require('moment')
const os = require('os')
require('moment-duration-format')

module.exports = {
  name: 'info',
  description: 'Get info on the server running Ava!',
  type: 'Misc',
  // eslint-disable-next-line no-unused-vars
  async execute(client, msg, _args) {
    const guildCount = (await client.shard.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0)
    const memberCount = (await client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')).reduce((prev, val) => prev + val, 0)
    const channelCount = (await client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.channels.cache.size, 0)')).reduce((prev, val) => prev + val, 0)
    const commandExecCount = (await client.database.selectFrom('ncollect', `where numdesc = 'messages.commands.exec.count'`)).rows[0].num
    const messageReadCount = (await client.database.selectFrom('ncollect', `where numdesc = 'messages.count'`)).rows[0].num
    const info = new Discord.MessageEmbed()
			.setColor('#339D33')
			.setTitle('Server Info')
			.setAuthor(`NodeJS ${require('child_process').execSync('node -v').toString()}`, 'https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
			.addFields(
        { name: 'CPU', value: `${os.cpus()[0].model}`, inline: false },
        { name: 'Mem Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} MB`, inline: true },
        { name: 'Free Mem', value: `${(os.freemem() / 1024 / 1024).toFixed(1)} MB`, inline: true },
        { name: 'Uptime', value: `${moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]")}`, inline: true },
        { name: 'Users', value: `${memberCount}`, inline: true },
        { name: 'Servers', value: `${guildCount}`, inline: true },
        { name: 'Channels', value: `${channelCount}`, inline: true },
        { name: 'Discord.js', value: Discord.version, inline: true },
        { name: 'Node', value: `${process.version}`, inline: true },
        { name: 'OS', value: `${os.type()}`, inline: true },
        { name: 'Executed Commands', value: commandExecCount, inline: true },
        { name: 'Messages Read', value: messageReadCount, inline: true }
			)
			.setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
      .setTimestamp()
		msg.channel.send(info)
  }
}
