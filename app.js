const Discord = require('discord.js')
const config = require('./config')
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });
const { attachmentIsImage } = require('./helpers/attachments.js')
const mysql = require('mysql')
const connectionDetails = {
	host: "localhost",
	user: "pi",
	password: "root",
	database: 'avadb'
}
const chalk = require('chalk')
let con = mysql.createConnection(connectionDetails);
const fetch = require('node-fetch');
const fs = require('fs')
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}
const cooldowns = new Discord.Collection()
const db = require('quick.db')
const Keyv = require('keyv')
const prefixes = new Keyv('sqlite://./prefixes.sqlite')
const globalPrefix = 'a!'
client.queue = new Map()

con.connect(function(err) {
	if(err) {
		console.log(chalk.red('error'), `when connecting to db: ${err}`);
	}
});

client.once('ready', async () => {
	// Production Only
	// fetch('https://maker.ifttt.com/trigger/ava_start/with/key/fv1KMm9l07e3vmqr183BeJ7t_c7rPLwDtQqR4gK-9Db')
	console.log(chalk.blue(`[Ava]`), chalk.green('[Ready]'),'Ready!')
	client.user.setPresence({
		activity: {
      name: 'a!help for help.',
      type: 'PLAYING',
  	},
    status: 'online',
  })
});

// MARK: Boards (Starboard, Sinboard, etc.)
client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (err) {
			console.log('Something Went Wrong: ', err);
			return
		}
	}
	setTimeout((reaction, user) => {
		if(!(reaction.count > 1)) {
			if(reaction.emoji.name == '\u{2b50}' || reaction.emoji.name == "\u{1f31f}" || reaction.emoji.name == "\u{1f929}") {
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
				.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
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
				.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
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
	}, 7000, reaction, user)
})

// MARK: Catch UnhandledPromiseRejectionWarnings
process.on('unhandledRejection', err => {
	console.error(chalk.red('[Uncaught] Promise Rejection'), err)
})

// MARK: Messages
client.on('message', async msg => {
	if(msg.channel.type != "text") return;
	if(!msg.channel.name.includes("spam") && !msg.author.bot) db.add(`user_${msg.guild.id}_${msg.author.id}.bal`, 1)
	let prefix = globalPrefix
	if(!msg.content.startsWith(globalPrefix)) {
		const guildPrefix = await db.get(`prefix_${msg.guild.id}`)
		if(msg.content.startsWith(guildPrefix)) prefix = guildPrefix
	}
	if(!msg.content.startsWith(prefix) || msg.author.bot) return;
	let args = msg.content.slice(prefix.length).split(/\s+/)
	let commandName = args.shift().toLowerCase()
	let command = client.commands.get(commandName)
			|| client.commands.find(c => c.aliases && c.aliases.includes(commandName))
	if(!command) return;
	if(!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection())
	}
	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 3) * 1000

	if(timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount

		if(now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return msg.reply(`You may not use the \`${command.name}\` command for another ${timeLeft.toFixed(1)} second(s)`)
		}
	}
	timestamps.set(msg.author.id, now)
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)
	try {
		if(command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${msg.author}!`
			if(command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
			}
			return msg.channel.send(reply)
		}
		if(command.nsfw && !msg.channel.nsfw) {
			return msg.channel.send(`This is not an nsfw channel, therefore I can\'t send this in here!`)
		}
		msg.prefix = prefix
		if(command.useMySQL) {
			await command.execute(client, msg, args, con)
		} else if(command.handlesPrefix) {
			await command.execute(client, msg, args, prefixes)
		} else {
			await command.execute(client, msg, args)
		}
	} catch (error) {
		console.error(error)
		msg.reply('there was an error trying to execute that command.')
	}
});

client.login(config.token)
