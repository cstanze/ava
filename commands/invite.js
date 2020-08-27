const Discord = require('discord.js')

module.exports = {
  name: 'invite',
  description: 'Get an Invite Code For Ava',
  type: 'Misc',
  execute(client, msg, args) {
    client.generateInvite(["ADMINISTRATOR"]).then(l => {
			msg.author.send(new Discord.MessageEmbed()
											.setTitle(`Invite`)
											.setDescription(`[Clickie](${l})`)
											.setThumbnail(client.user.avatarURL({ dynamic: true, format: 'png' }))
											.setAuthor(msg.guild.name, msg.guild.iconURL({ dynamic: true, format: 'png' }))
											.setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true, format: 'png' }))
											.setTimestamp())
			).then(_ => {
				msg.channel.send(`<@!${msg.author.id}>, I've sent a DM!`)
			}).catch(_ => {
				msg.channel.send(`:warning: Couldn't send DM. Attempting to send in channel.`).then(mxg => {
					setTimeout(mxg => {
						mxg.delete()
					}, 3000, mxg)
					msg.channel.send(`<@!${msg.author.id}>`, new Discord.MessageEmbed()
											.setTitle(`Invite`)
											.setDescription(`[Clickie](${l})`)
											.setThumbnail(client.user.avatarURL({ dynamic: true, format: 'png' }))
											.setAuthor(msg.guild.name, msg.guild.iconURL({ dynamic: true, format: 'png' }))
											.setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true, format: 'png' }))
											.setTimestamp())
				})
			})
			
    })
  }
}
