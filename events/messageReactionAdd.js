const { attachmentIsImage } = require('../helpers/attachments.js')
const Discord = require('discord.js')
// StarBoard, HonorBoard, SinBoard, etc.

module.exports = async (client, reaction, user) => {
  if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (err) {
			console.log('Something Went Wrong: ', err);
			return
		}
	}
	if(reaction.message.channel.type != "text") return
	if(reaction.count == 3) {
		if(reaction.emoji.name == '👏' || reaction.emoji.name == '\u{2b50}' || reaction.emoji.name == "\u{1f31f}" || reaction.emoji.name == "\u{1f929}") {
			let starboard = reaction.message.guild.channels.cache.find(channel => channel.name == "honorable-mentions")
			if(!starboard) return
			let msg = reaction.message
			let hasAttachment = false
			if(typeof msg.attachments.array()[0] != "undefined") hasAttachment = true
      let isSpoiler = false
      let attachment = hasAttachment ? msg.attachments.first() : null
			if(hasAttachment) isSpoiler = attachment.spoiler
	    if(hasAttachment && reaction.message.channel.nsfw) isSpoiler = true
			let reactionClient = reaction.message.member.user
			let starredEmbed = new Discord.MessageEmbed()
			.setColor('#14c49e')
			.setDescription(reaction.message.content)
			.addField('Original', `[Jump!](${reaction.message.url})`)
			.setAuthor(reactionClient.username, reactionClient.avatarURL({ size: 128, dynamic: true }), null)
			.setTimestamp()
			.setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)], null)
			starboard.send(`:clap: **${reaction.count}** <#${reaction.message.channel.id}> ID: ${reaction.message.id}`)
			if(hasAttachment) {
				if(attachmentIsImage(attachment)) {
					if(isSpoiler) {
						starredEmbed.attachFiles(['./images/spoiler.png'])
						.setImage('attachment://spoiler.png')
					} else {
						starredEmbed.setImage(attachment.url)
					}
				}
				// starboard.send(attachment.url)
        starredEmbed.addField('Extra', 'This message may contain a video or file and I couldn\'t send it.')
			}
			starboard.send(starredEmbed)
		}
	} else if(!(reaction.count > 1)) {
		if(reaction.emoji.name == '\u{2b50}' || reaction.emoji.name == "\u{1f31f}" || reaction.emoji.name == "\u{1f929}" || reaction.emoji.name == "star") {
			let starboard = reaction.message.guild.channels.cache.find(channel => channel.name == "starboard")
			if(!starboard) return
			let msg = reaction.message
			let hasAttachment = false
			if(typeof msg.attachments.array()[0] != "undefined") hasAttachment = true
      let isSpoiler = false
      let attachment = hasAttachment ? msg.attachments.first() : null
			if(hasAttachment) isSpoiler = attachment.spoiler
	    if(hasAttachment && reaction.message.channel.nsfw) isSpoiler = true
			let reactionClient = reaction.message.member.user
			let starredEmbed = new Discord.MessageEmbed()
			.setColor('#14c49e')
			.setDescription(reaction.message.content)
			.addField('Original', `[Jump!](${reaction.message.url})`)
			.setAuthor(reactionClient.username, reactionClient.avatarURL({ size: 128, dynamic: true }), null)
			.setTimestamp()
			.setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)], null)
			if(hasAttachment) {
				if(attachmentIsImage(attachment)) {
					if(isSpoiler) {
						starredEmbed.attachFiles(['./images/spoiler.png'])
						.setImage('attachment://spoiler.png')
					} else {
						starredEmbed.setImage(attachment.url)
					}
				} else {
					starredEmbed.addFields(
						{ name: 'Extra', value: 'This messages appears to have an attachment other than an image or gif. It might be a video.', inline: false }
					)
				}
			}
			starboard.send(`:star: **${reaction.count}** <#${reaction.message.channel.id}> ID: ${reaction.message.id}`)
			starboard.send(starredEmbed)
		} else if(reaction.emoji.name == "sin") {
			let sinboard = reaction.message.guild.channels.cache.find(channel => channel.name == "hall-of-sin")
			if(!sinboard) {
				return;
			}
			let msg = reaction.message
			let hasAttachment = false
			if(typeof msg.attachments.array()[0] != "undefined") hasAttachment = true
			let isSpoiler = false
			let attachment = hasAttachment ? msg.attachments.first() : null
			if(hasAttachment) isSpoiler = attachment.spoiler
			if(hasAttachment && reaction.message.channel.nsfw) isSpoiler = true
			let reactionClient = reaction.message.member.user
			let sinnedEmbed = new Discord.MessageEmbed()
			.setColor('#14c49e')
			.setDescription(reaction.message.content)
			.addField('Original', `[Jump!](${reaction.message.url})`)
			.setAuthor(reactionClient.username, reactionClient.avatarURL({ size: 128, dynamic: true }), null)
			.setTimestamp()
			.setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)], null)
			if(hasAttachment) {
				if(attachmentIsImage(attachment)) {
					if(sinboard.nsfw) {
						sinnedEmbed.attachFiles(['./images/spoiler.png'])
						.setImage('attachment://spoiler.png')
					} else {
						sinnedEmbed.setImage(attachment.url)
					}
				} else {
					sinnedEmbed.addFields(
						{ name: 'Extra', value: 'This messages appears to have an attachment other than an image or gif. It might be a video.', inline: false }
					)
				}
			}
			sinboard.send(`<:${reaction.emoji.name}:${reaction.emoji.id}> **${reaction.count}** <#${reaction.message.channel.id}> ID: ${reaction.message.id}`)
			sinboard.send(sinnedEmbed)
		}
	}
}
