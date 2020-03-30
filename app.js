const Discord = require('discord.js')
const randomPuppy = require('random-puppy')
const config = require('./config')
const vaporString = require('./vapor')
const prefix = config.prefix;
let sequenceStarter = null
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
let randomGivers = ["Here you go!", "Here it is!"]
let isInBanConfirmation = false
let banConfirmMember = null
let rebootShardConfirm = false
let banTimeout = null
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });
const mysql = require('mysql')
const connectionDetails = {
	host: "localhost",
	user: "pi",
	password: "root",
	database: 'avadb'
}
let con  = mysql.createConnection(connectionDetails);
const AsciiTable = require('ascii-table')

client.once('ready', () => {
	console.log('Ready!')
	client.user.setPresence({
		activity: {
			name: 'with my cat',
			type: 'PLAYING'
		},
		status: 'online',
	})
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (err) {
			console.log('Something Went Wrong: ',err);
			return
		}
	}
	setTimeout((reaction, user) => {
		if(reaction.emoji.name == '\u{2B50}') {
			let starboard = reaction.message.guild.channels.cache.find(channel => channel.name == "starboard")
			if(!starboard) {
				return;
			}
			let reactionClient = user
			let starredEmbed = new Discord.MessageEmbed()
			.setColor('#14c49e')
			.setDescription(reaction.message.content)
			.addField('Original', `[Jump!](${reaction.message.url})`)
			.setAuthor(reactionClient.username, reactionClient.avatarURL({ size: 128, dynamic: true }), null)
			.setTimestamp()
			.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
			starboard.send(`:star: **${reaction.count}** <#${reaction.message.channel.id}> ID: ${reaction.message.id}`)
			starboard.send(starredEmbed)
		}
	}, 3000, reaction, user)
})

client.on('message', msg => {
	if(msg.content.startsWith(config.prefix+"roleAdd")) {
		let role = msg.mentions.roles.array()[0]
		let member = msg.mentions.members.array()[0]
		member.roles.add(role)
		msg.channel.send(`Added Role: ${role.name} to member: ${member.nickname ? member.nickname : member.user.username}`)
	} else if(msg.content.startsWith(config.prefix+"roleRemove")) {
		let role = msg.mentions.roles.first()
		let member = msg.mentions.members.first()
		member.roles.remove(role)
		msg.channel.send(`Removed Role: ${role.name} from member: ${member.nickname ? member.nickname : member.user.username}`)
	} else if(msg.content.startsWith(config.prefix+"aww")) {
		randomPuppy('aww').then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
	} else if(msg.content.startsWith(config.prefix+"dog")) {
		randomPuppy().then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
	} else if(msg.content.startsWith(config.prefix+"kitten")) {
		randomPuppy('kitten').then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
	} else if(msg.content.startsWith(config.prefix+"crab")) {
		let args = msg.content.replace(config.prefix+"crab ", "") == config.prefix+"crab" ? "1" : msg.content.replace(config.prefix+"crab ", "")
		let finalCrabs = ""
		args = Number(args)
		if(isNaN(args)) {
			msg.channel.send(":crab:")
			return;
		}
		if(args > 214) {
			msg.channel.send("Limit is 214 crabs")
			return;
		}
		for(let i=0;i<args;i++) {
			finalCrabs += ":crab:"
		}
		msg.channel.send(finalCrabs)
	} else if(msg.content.startsWith(config.prefix+"whatshard")) {
		let shard = msg.guild.shard
		msg.channel.send(`This server is on shard \`${shard.id}\` with heartbeat ping of \`${shard.ping}ms\``)
	} else if(msg.content.startsWith(config.prefix+"confirm")) {
		if(msg.member == sequenceStarter) {
			if(isInBanConfirmation && banConfirmMember) {
				let shouldEscapeBefore = false
				banConfirmMember.ban({ reason: `Banned from Ava. Confirmed by ${sequenceStarter.user.tag}` }).catch(err => {
					if(err.message == "Missing Permissions" && err.httpStatus == 403 && err.code == 50013) {
						msg.channel.send("It seems that I have insufficient permissions.")
						msg.channel.send("Please ensure that my user specific role is on the top of the role hierarchy")
					} else {
						console.log(err)
						msg.channel.send("Some error occured. Couldn't ban user")
					}
					shouldEscapeBefore = true
				}).then(() => {
					msg.channel.send("Ban Confirmed. User Banned...")
				})
				clearTimeout(banTimeout)
			} else if(rebootShardConfirm) {
				client.shard.respawnAll()
			}
		} else {
			msg.channel.send("Looks like you're not the person who instantiated the sequence or a confirm sequence hasn't be started")
		}
	} else if(msg.content.startsWith(config.prefix+"ban")) {
		let member = msg.mentions.members.first()
		if(member.user == client.user) {
			msg.channel.send("I can\'t ban myself, silly!")
			return;
		}
		if(msg.member.hasPermission("BAN_MEMBERS")) {
			isInBanConfirmation = true
			banConfirmMember = member
			sequenceStarter = msg.member
			msg.channel.send("Type a!confirm to confirm the ban.")
			msg.channel.send("*Ban will be auto-cancelled in 5 minutes*")
			banTimeout = setTimeout(msg => {
				isInBanConfirmation = false
				banConfirmMember = null
				sequenceStarter = null
				msg.channel.send("*Ban has been auto-cancelled.*")
			}, 300000, msg)
		} else {
			msg.channel.send("*Insufficient Permissions*")
		}
	} else if(msg.content.startsWith(config.prefix+"cancelBan")) {
		isInBanConfirmation = false
		banConfirmMember = null
		sequenceStarter = null
		clearTimeout(banTimeout)
		msg.channel.send("*Ban has been cancelled*")
	} else if(msg.content.startsWith(config.prefix+"killshard")) {
		if(msg.member.hasPermission("KICK_MEMBERS")) {
			msg.channel.send("This is a lot of power in one command. This kills the *entire* bot.")
			msg.channel.send("This command may have unintented consequences")
			msg.channel.send("Type a!confirm to confirm shard kill")
			let shard = msg.guild.shard
			msg.channel.send(`This server is on shard \`${shard.id}\` with heartbeat ping of \`${shard.ping}ms\``)
			rebootShardConfirm = true
			sequenceStarter = msg.member
		}
	} else if(msg.content.startsWith(config.prefix+"premDB")) {
		// Access MySQL Bot Status DB
		con.query('SELECT * FROM premiumServers;', (err, res, fields) => {
			let table = new AsciiTable("Premium Servers")
			.setHeading('id', 'name', 'level')
			for(let i=0;i<res.length;i++) {
				table.addRow(
					[res[i].id, res[i].name, res[i].level]
				)
			}
			msg.channel.send(`\`\`\`\n${table.toString()}\`\`\``)
		})
	} else if(msg.content.startsWith(config.prefix+"addPremium")) {
		let guild = msg.guild
		let guildId = guild.id
		let guildName = guild.name
		let shouldUpdate = false
		let serverdata = null
		con.query(`SELECT * FROM premiumServers WHERE name=\"${guildName}\" AND serverId=${guildId};`, (err, res, fields) => {
			// Looks like weird code but I swear it works
			shouldUpdate = true
			serverdata = res[0]
			console.log(serverdata)
			let premQuery = shouldUpdate ? `UPDATE premiumServers SET level=${serverdata.level == 99 ? serverdata.level : serverdata.level+1} WHERE name="${guildName}" AND serverId=${guildId};` 
									 : `INSERT INTO premiumServers (name, serverId, level) VALUES ("${guildName}", "${guildId}", 1)`
			con.query(premQuery, (err, res, fields) => {
				if(err) {
					console.log(err)
				}
			})
		})
		msg.channel.send("Updated Premium Server Listings.")
	} else if(msg.content.startsWith(config.prefix+"vapor")) {
		// a!vapor hello bros
		let args = msg.content.replace(config.prefix+"vapor", "")[0] == " " ? msg.content.replace(config.prefix+"vapor ", "") : "You Need Text"
		msg.channel.send(vaporString(args))
	}
});

client.login(config.token)
