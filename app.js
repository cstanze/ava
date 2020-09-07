/**
 * TODO          REFERENCES
 * VC bot        VoiceMaster/Yggdrasil
 * HQ Hentai     Marriage Bot
 * Channel Nuke  Yui
 * Dev Utils     Dyno/Mee6
 **/

const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require('./config')
let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]
const client = new Discord.Client({ partials: ['REACTION'] });
client.randomFooters = ['Proudly created in nano', 'Puppers!', ':O', 'CPU Overheating...', 'Quacc', 'Welcome Cthulu!', 'Widen That Keyhole...', '01000110', 'Schrodinger\'s Trap', 'Arrest Him!', 'ANARCHY', 'Made In Canada', 'I used to be called Anarchy Angola.', 'My flag is two colors and a leaf', 'bruh', 'Who the fuck put my cat on the z-axis', 'upset', 'I\'m 5 years old', 'OwO Whats This?', 'Lolicon', 'NEET', 'Shut-In NEET', 'Kazuma and Megumin', 'Cat On Z Axis', 'Clean up on aisle 5', 'Wifi Slow', 'YooHoon', 'm-minecwaft uwu!', '>w<', 'Senko-san', 'Fax it over to you', 'Fax it under you', 'Fax it into you', 'Fax it over you', 'at least aim it', 'he\'s lost his right to a window', 'nice job oscar', 'if the soil starts to get acidic, you went too far', 'its just a garden party', 'you dont need a reason', 'yes, darryl?', 'dont be offensive', 'dont be cliche', 'dont take the first two rules too seriously', 'this is ridiculous', 'every. single. day.', 'it\'s all toby\'s fault.', 'im a lucky turkey', 'who cares what erin\'s feeling', 'bob vance, vance refrigeration', 'creepypasta', 'that\'s what everyone sees. thats the man in black', 'i saw a ghost', 'i dont know what to tell you jim, but i saw a ghost']
client.randomNSFWFooters = ['Fill Me Senpai', 'He is my senpai', 'OwO Nice Stuff Senpai', 'owo nice shtuff shenpai', 'f-fiww me with youw cweamy eshense uwu', 'ara ara~', '~ara ara ara ara~!', 'nya~', 'nya!']
client.badTokens = ['retard', 'idiot', 'bitch', 'stupid', 'ass', 'asshat', 'dick', 'dickhead', 'shit', 'piss', 'pissoff', 'asshole', 'bastard', 'cunt', 'bollocks', 'bugger', 'hell', 'choad', 'crikey', 'rubbish', 'trash', 'shag', 'wanker', 'wank', 'twat']
const chalk = require('chalk')
const fs = require('fs')
const Enmap = require('enmap')
const { Database } = require('./modules/Database.js')
const pg = require('pg')
const dbClient = new pg.Client({
	user: 'jdfgrvrzaweeqt',
	host: 'ec2-54-234-44-238.compute-1.amazonaws.com',
	database: 'd3lpu57elj1aqk',
	password: '5a9cf696b5da5bbc4f3630c174a4053297c895f24ec4b2032a51105b8c6a0c8a',
	port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});
client.database = new Database(dbClient)
dbClient.connect()
const longjohn = require('longjohn')
client.logger = require('./modules/Logger')
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
console.log(chalk.blue('[Ava]'), chalk.yellow(`[Command] [Load]`), `Loading a total of ${commandFiles.length} commands`)
for(const file of commandFiles) {
	try{
		const command = require(`./commands/${file}`)
		console.log(chalk.blue(`[Ava]`), chalk.yellow(`[Command]`), chalk.white(`[Loading]`), `Loading command with name: ${command.name}`)
		client.commands.set(command.name, command)
	} catch(e) {
		console.error(`Error while loading command: ${file.split('.')[0]}`, e)
	}
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
console.log(chalk.blue('[Ava]'), chalk.yellow(`[Event] [Load]`), `Loading a total of ${eventFiles.length} events`)
for(const ev of eventFiles) {
	const eventName = ev.split('.')[0]
	try {
		console.log(chalk.blue(`[Ava]`), chalk.yellow(`[Event]`), chalk.white(`[Loading]`), `Loading event with name: ${eventName}`)
		const evx = require(`./events/${ev}`)
		client.on(eventName, evx.bind(null, client))
	} catch(e) {
		console.log(`Error while loading event: ${eventName}`, e)
	}
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
	// Production Only
	// fetch('https://maker.ifttt.com/trigger/ava_start/with/key/fv1KMm9l07e3vmqr183BeJ7t_c7rPLwDtQqR4gK-9Db')
	console.log(chalk.blue(`[Ava][Shard ${client.shard.ids[0]}]`), chalk.green('[Ready]'),'Ready!')
	client.user.setPresence({
		activity: {
      // name: 'helping those in need || a!help',
      name: 'maintenance mode active. sorry for the inconvenience!',
      type: 'STREAMING',
      url: 'https://twitch.tv/julztdg'
      // type: 'PLAYING',
  	},
    status: 'online',
  })
});

// MARK: Catch UnhandledPromiseRejectionWarnings
process.on('unhandledRejection', err => {
	if(err.toString().includes("embed.fields[0].value: This field is required")) return
	console.error(chalk.red('[Uncaught] Promise Rejection'), err)
  console.log({ ...err })
})

// MARK: Catch UncaughtException
process.on('uncaughtException', (err) => {
	console.log(chalk.red('[Uncaught] Exception'), err)
	console.log({ ...err })
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
	let blacklisted = await db.get(`blacklist`) || []
	let blacklistStatus = blacklisted.find(u => u.userId == msg.member.id)
	if(typeof blacklistStatus != 'undefined') return
	if(msg.content.includes(client.token)) msg.delete()
	if(msg.channel.name != await client.valueForSettingsKey(`nxp`, msg.guild)) db.add(`user_${msg.guild.id}_${msg.author.id}.bal`, Math.floor(Math.random() * 10))
	if(msg.channel.name != await client.valueForSettingsKey(`nxp`, msg.guild)) db.add(`user_${msg.guild.id}_${msg.author.id}.xp`, Math.floor(Math.random() * 5))
  let prefix = globalPrefix
	if(!msg.content.toLowerCase().startsWith(globalPrefix)) {
		let guildPrefix = await client.database.selectFrom(`prefixes`, `WHERE guildid = '${msg.guild.id}'`)
		guildPrefix = typeof guildPrefix.rows[0] == 'undefined' ? 'a!' : guildPrefix.rows[0].prefix
		if(msg.content.toLowerCase().startsWith(guildPrefix)) prefix = guildPrefix
	}
	const mentionPrefix = new RegExp(`^<@!?${client.user.id}>( |)$`)
	if(msg.content.match(mentionPrefix)) {
		return msg.reply(`My global prefix is: \`${globalPrefix}\`. ${msg.member.hasPermission('MANAGE_GUILD') ? `You can use \`${globalPrefix}prefix <prefix>\` to change the prefix for this guild!` : `You can use \`${globalPrefix}prefix\` to find the prefix for this guild!`}`)
	}
  let args = msg.content.slice(prefix.length).split(/\s+/)
  let commandName = args.shift().toLowerCase()
                                                                                                                                                 //  5 3 3 8 3 3 4 3 0 5 0 1 4 2 5 1 5 3
  if(!(/#\d\d\d\d/.test(msg.content)) && !(/#\d\d\d\d\d/.test(msg.content)) && !(/#\d\d/.test(msg.content)) && !(/#\d/.test(msg.content)) && !(/<#!?\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d>/.test(msg.content)) && /#([0-9a-f]{3}){1,2}/gi.test(msg.content) && commandName != 'color') {
    let hexes = msg.content.match(/#([0-9a-f]{3}){1,2}/gi)
    let color = client.commands.get('color')
    for(let hex of hexes) {
      await color.execute(client, msg, [hex])
    }
  }
	if(!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot || msg.webhookID) return;
  if(msg.guild.id != '444116329977610240') return msg.channel.send(`Hey! I've been disabled for maintenance. Sorry for the inconvenience!`)
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
	const settings = msg.settings = client.getSettings(msg.guild)
	const level = client.permLevel(msg)
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
			if(!msg.channel.name.includes('nsfw')) return msg.channel.send(`This is not an nsfw channel, therefore I can\'t send this in here!`)
		}
		msg.prefix = prefix
		await command.execute(client, msg, args)
	} catch (error) {
		console.error(error)
		msg.reply('there was an error trying to execute that command.')
	}
});

client.login(config.token)
longjohn.async_trace_limit = -1;
longjohn.empty_frame = '--==--==--LONGJOHN--==--==--';
