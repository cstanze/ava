const Discord = require('discord.js')
const config = require('./config')
let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]
const { attachmentIsImage } = require('./helpers/attachments.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });
client.randomFooters = ['Proudly created in nano', 'Puppers!', ':O', 'CPU Overheating...', 'Quacc', 'Welcome Cthulu!', 'Widen That Keyhole...', '01000110', 'Schrodinger\'s Trap', 'Arrest Him!', 'ANARCHY', 'Made In Canada', 'I used to be called Anarchy Angola.', 'My flag is two colors and a leaf', 'bruh', 'Who the fuck put my cat on the z-axis', 'upset', 'I\'m 5 years old', 'OwO Whats This?', 'Lolicon', 'NEET', 'Shut-In NEET', 'Kazuma and Megumin', 'Cat On Z Axis', 'Clean up on aisle 5', 'Wifi Slow', 'YooHoon', 'm-minecwaft uwu!', '>w<', 'Senko-san']
client.randomNSFWFooters = ['Fill Me Senpai', 'He is my senpai', 'OwO Nice Stuff Senpai', 'owo nice shtuff shenpai', 'f-fiww me with youw cweamy eshense uwu', 'ara ara~', '~ara ara ara ara~!', 'nya~', 'nya!']
client.badTokens = ['retard', 'idiot', 'bitch', 'stupid', 'ass', 'asshat', 'dick', 'dickhead', 'shit', 'piss', 'pissoff', 'asshole', 'bastard', 'cunt', 'bollocks', 'bugger', 'hell', 'choad', 'crikey', 'rubbish', 'trash', 'shag', 'wanker', 'wank', 'twat']
const chalk = require('chalk')
const fs = require('fs')
const Enmap = require('enmap')
client.logger = require('./modules/Logger')
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
console.log(chalk.blue('[Ava]'), chalk.yellow(`[Command] [Load]`), `Loading a total of ${commandFiles.length} commands`)
for(const file of commandFiles) {
	const command = require(`./commands/${file}`)
	console.log(chalk.blue(`[Ava]`), chalk.yellow(`[Command]`), chalk.white(`[Loading]`), `Loading command with name: ${command.name}`)
	client.commands.set(command.name, command)
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
console.log(chalk.blue('[Ava]'), chalk.yellow(`[Event] [Load]`), `Loading a total of ${eventFiles.length} events`)
for(const ev of eventFiles) {
	const eventName = ev.split('.')[0]
	console.log(chalk.blue(`[Ava]`), chalk.yellow(`[Event]`), chalk.white(`[Loading]`), `Loading event with name: ${eventName}`)
	const evx = require(`./events/${ev}`)
	client.on(eventName, evx.bind(null, client))
}
client.config = require('./advanced_config.js')
// Generate a cache of client permissions for pretty perm names in commands
client.levelCache = {}
for(let i=0;i<client.config.permLevels.length;i++) {
	const thisLevel = client.config.permLevels[i]
	client.levelCache[thisLevel.name] = thisLevel.level
}
client.cooldowns = new Discord.Collection()
// Thanks to Evie's awesome EnMap module, we can save a collection to disk. Perfect for per-server configs
// This makes things really, really, really easy for us!
client.settings = new Enmap({ name: 'settings' })
const db = require('quick.db')
const globalPrefix = 'a!'
require('./modules/functions.js')(client)

client.once('ready', async () => {
	setTimeout(() => {
		const avatarFiles = fs.readdirSync('./avatars').filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif'))
		if(avatarFiles.length) return
		console.log(chalk.blue('[Ava] [Meta]'), chalk.yellow(`[Avatar] [Prep]`), `Preparing a total of ${avatarFiles.length} avatars`)
		const avatarFile = avatarFiles.random()
		client.user.setAvatar(`./avatars/${avatarFile}`)
	}, 300000);
	// Production Only
	// fetch('https://maker.ifttt.com/trigger/ava_start/with/key/fv1KMm9l07e3vmqr183BeJ7t_c7rPLwDtQqR4gK-9Db')
	console.log(chalk.blue(`[Ava][Shard ${client.shard.ids[0]}]`), chalk.green('[Ready]'),'Ready!')
	client.user.setPresence({
		activity: {
      name: 'a!help for help.',
      type: 'PLAYING',
  	},
    status: 'online',
  })
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (err) {
			console.log('Something Went Wrong: ', err);
			return
		}
	}
	if(reaction.message.channel.type != "text") return
	if((reaction.count >= 3) && (reaction.count <= 3)) {
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
				starboard.send(attachment.url)
			}
			starboard.send(starredEmbed)
		}
	} else if(!(reaction.count > 1)) {
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
})

// MARK: Catch UnhandledPromiseRejectionWarnings
process.on('unhandledRejection', err => {
	console.error(chalk.red('[Uncaught] Promise Rejection'), err)
	console.error(chalk.red('[Uncaught] Promise Rejection'), chalk.yellow('[Stack Trace]'), err.stack)
})

// MARK: Catch UncaughtException
process.on('uncaughtException', (err) => {
	const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './')
	console.log(chalk.red('[Uncaught] Exception'), errorMsg)
	console.error(err)
})

// MARK: Debugging Information Logs (Enable Only If Completely Necessary)
/*
 * client.on('debug', debugInfo => {
 *	console.log(chalk.blue(`[Ava][Shard ${client.shard.ids[0]}]`),chalk.yellow(`[Debug]`), debugInfo)
 * })
 */

// MARK: Messages
client.on('message', async msg => {
	if(msg.channel.type != "text") return;
	if(msg.author.bot || msg.webhookID) return;
	let blacklisted = await db.get(`blacklist`)
	let blacklistStatus = blacklisted.find(u => u.userId == msg.member.id)
	if(typeof blacklistStatus != 'undefined') return
	if(msg.content.includes(client.token)) msg.delete()
	if(msg.channel.name != await client.valueForSettingsKey(`no-xp-channel`, msg.guild)) db.add(`user_${msg.guild.id}_${msg.author.id}.bal`, Math.floor(Math.random() * 10))
	if(msg.channel.name != await client.valueForSettingsKey(`no-xp-channel`, msg.guild)) db.add(`user_${msg.guild.id}_${msg.author.id}.xp`, Math.floor(Math.random() * 5))
	let prefix = globalPrefix
	if(!msg.content.startsWith(globalPrefix)) {
		const guildPrefix = await db.get(`prefix_${msg.guild.id}`)
		if(msg.content.startsWith(guildPrefix)) prefix = guildPrefix
	}
	const mentionPrefix = new RegExp(`^<@!?${client.user.id}>( |)$`)
	if(msg.content.match(mentionPrefix)) {
		return msg.reply(`My global prefix is: \`${globalPrefix}\`. ${msg.member.hasPermission('MANAGE_GUILD') ? `You can use \`${globalPrefix}prefix <prefix>\` to change the prefix for this guild!` : `You can use \`${globalPrefix}prefix\` to find the prefix for this guild!`}`)
	}
	if(!msg.content.startsWith(prefix) || msg.author.bot || msg.webhookID) return;
	let args = msg.content.slice(prefix.length).split(/\s+/)
	let commandName = args.shift().toLowerCase()
	let command = client.commands.get(commandName)
			|| client.commands.find(c => c.aliases && c.aliases.includes(commandName))
	if(!command) return;
	if(!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Discord.Collection())
	}
	const now = Date.now()
	const timestamps = client.cooldowns.get(command.name)
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
	const level = client.permLevel(msg)
	const settings = msg.settings = client.getSettings(msg.guild)
	if(level < client.levelCache[command.permissionsLevel || "User"]) {
		if(settings.systemNotice == "true") {
			return msg.channel.send(`You do not have the right permissions to use this command. Your permissions level is ${level} (${client.config.permLevels.find(l => l.level == level).name})\nThis command requires a permissions level of ${client.levelCache[command.permissionsLevel]} (${command.permissionsLevel})`)
		}
		return
	}
	msg.author.permLevel = level
	msg.member.user.permLevel = level
	try {
		if(command.args && !args.length) {
			let reply = `Looks like you didn't provide any arguments.`
			if(command.usage) {
				reply += `\nProper Usage: \`${prefix}${command.name} ${command.usage}\``
			}
			if(command.example) {
				reply += `\n\`${prefix}${command.name} ${command.example}\``
			}
			return msg.channel.send(reply)
		}
		if(command.nsfw && !msg.channel.nsfw) {
			return msg.channel.send(`This is not an nsfw channel, therefore I can\'t send this in here!`)
		}
		msg.prefix = prefix
		await command.execute(client, msg, args)
	} catch (error) {
		console.error(error)
		msg.reply('there was an error trying to execute that command.')
	}
	db.set(`user_${msg.guild.id}_${msg.author.id}.lastCommand`, commandName)
});

client.login(config.token)
