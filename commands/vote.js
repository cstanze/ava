const Discord = require('discord.js')

module.exports = {
  name: 'vote',
  description: 'Get Vote Link For Ava',
  type: 'Misc',
  execute(client, msg, args) {
    const v = `https://top.gg/bot/702896046480818218/vote`
		msg.author.send('Thank you for choosing to vote!', new Discord.MessageEmbed()
                    .setTitle(`Vote`)
										.setDescription(`[Clickie](${v})`)
										.setThumbnail(client.user.avatarURL({ dynamic: true, format: 'png' }))
										.setAuthor(msg.guild.name, msg.guild.iconURL({ dynamic: true, format: 'png' }))
										.setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true, format: 'png' }))
										.setTimestamp()
		).then(_ => {
			msg.channel.send(`<@!${msg.author.id}>, I've sent a DM!`)
		}).catch(_ => {
			msg.channel.send(`:warning: Couldn't send DM. Attempting to send in channel.`).then(mxg => {
				setTimeout(mxg => {
					mxg.delete()
				}, 3000, mxg)
				msg.channel.send(`<@!${msg.author.id}> Thank you for choosing to vote!`, new Discord.MessageEmbed()
										.setTitle(`Vote`)
										.setDescription(`[Clickie](${v})`)
										.setThumbnail(client.user.avatarURL({ dynamic: true, format: 'png' }))
										.setAuthor(msg.guild.name, msg.guild.iconURL({ dynamic: true, format: 'png' }))
										.setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true, format: 'png' }))
										.setTimestamp())
			})
		})
  }
}
