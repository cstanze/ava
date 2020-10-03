module.exports = {
  name: 'donate',
  description: 'Donate to the creators of Ava!',
  aliases: ['donations'],
  cooldown: 5,
  type: 'Misc',
  execute(client, msg, args) {
    const d = `https://paypal.me/ConstanzeDev`
    msg.author.send('Thank you for choosing to donate!', new Discord.MessageEmbed()
                    .setTitle(`Donate`)
  									.setDescription(`[Clickie](${d})`)
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
  			msg.channel.send(`<@!${msg.author.id}> Thank you for choosing to donate!`, new Discord.MessageEmbed()
  									.setTitle(`Donate`)
  									.setDescription(`[Clickie](${d})`)
  									.setThumbnail(client.user.avatarURL({ dynamic: true, format: 'png' }))
  									.setAuthor(msg.guild.name, msg.guild.iconURL({ dynamic: true, format: 'png' }))
  									.setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true, format: 'png' }))
  									.setTimestamp())
  		})
  	})
  }
}
