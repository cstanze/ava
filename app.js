const Discord = require('discord.js')
const psNode = require('ps-node');
const randomPuppy = require('random-puppy')
const config = require('./config')
const vaporString = require('./vapor')
const prefix = config.prefix;
let sequenceStarter = null
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
let randomGivers = ["Here you go!", "Here it is!", "I found it!", "Searching...Found it!", "Looking..."]
let isInBanConfirmation = false
let banConfirmMember = null
let banTimeout = null
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });
const { argumentDictionaryFromMessage } = require('./helpers/arguments.js')
const { fetchMemberWithId } = require('./helpers/fetchMember.js')
const { asyncForEach } = require('./helpers/asyncForEach.js');
const { getDefaultChannel } = require('./helpers/defaultChannel.js')
const { attachmentIsImage } = require('./helpers/attachments.js')
const { handlePrefixAlter, handlePrefixFinish } = require('./handlers/prefix.js')
const mysql = require('mysql')
let dispatcher = null
let isPlaying = false
let isInAlterMode = false
let isInPrefixAlterMode = false
let prefixAlterModeId = null
let connection = null
let channelName = "Semi-Stable"
let versionString = `v1.9.9`
const connectionDetails = {
	host: "localhost",
	user: "pi",
	password: "root",
	database: 'avadb'
}
let alterModeId = null
let con  = mysql.createConnection(connectionDetails);
const AsciiTable = require('ascii-table')
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');

client.once('ready', () => {
	con.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
    }
  });
	// Production Only
	// fetch('https://maker.ifttt.com/trigger/ava_start/with/key/fv1KMm9l07e3vmqr183BeJ7t_c7rPLwDtQqR4gK-9Db')
	console.log('Ready!')
	client.user.setPresence({
		activity: {
      name: 'with Skrill and Rick',
      type: 'STREAMING',
      url: "https://youtube.com/watch?v=ZkqyIoYAXV8?t=169"
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
		if(!(reaction.count > 1)) {
			if(reaction.emoji.name == '\u{2b50}' || reaction.emoji.name == "\u{1f31f}" || reaction.emoji.name == "\u{1f929}") {
				let starboard = reaction.message.guild.channels.cache.find(channel => channel.name == "starboard")
				if(!starboard) {
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
						starredEmbed.addField('Extra', 'This messages appears to have an attachment other than an image or gif. It might be a video.')
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
						if(isSpoiler) {
							sinnedEmbed.attachFiles(['./images/spoiler.png'])
							.setImage('attachment://spoiler.png')
						} else {
							sinnedEmbed.setImage(attachment.url)
						}
					} else {
						sinnedEmbed.addField('Extra', 'This messages appears to have an attachment other than an image or gif. It might be a video.')
					}
				}
				sinboard.send(`<:${reaction.emoji.name}:${reaction.emoji.id}> **${reaction.count}** <#${reaction.message.channel.id}> ID: ${reaction.message.id}`)
				sinboard.send(sinnedEmbed)
			}
		}
	}, 7000, reaction, user)
})

client.on('message', async msg => {
	let noPrefix = msg.content.replace(config.prefix, "")
	let command = noPrefix.split(" ")[0]
	if(isInPrefixAlterMode && sequenceStarter != null && sequenceStarter == msg.member && prefixAlterModeId != null) {
		handlePrefixAlter(msg, alterModeId)
	}
	for(let d=0;d<config.prefix.length;d++) {
		if(msg.content[d] != config.prefix[d]) {
			return;
		}
	}
	if(command == "kick") {
		if(msg.member.hasPermission("KICK_MEMBERS")) {
			const user = msg.mentions.users.first();
	    if (user) {
	      const member = msg.guild.member(user);
	      if (member) {
	        member
	          .kick('Optional reason that will display in the audit logs')
	          .then(() => {
	            msg.channel.send(`Successfully kicked ${user.tag}`);
	          })
	          .catch(err => {
	            msg.channel.send('I was unable to kick the member');
	            console.error(err);
	          });
	      } else {
	        msg.channel.send("That user isn't in this guild!");
	      }
	    } else {
	      msg.channel.send("You didn't mention the user to kick!");
	    }
		} else {
			msg.channel.send("You don't have kick permissions, silly");
		}
	} else if(command == "roleAdd") {
		if(msg.member.hasPermission("MANAGE_ROLES")) {
			let role = msg.mentions.roles.array()[0]
			let member = msg.mentions.members.array()[0]
			if(!role) {
				msg.channel.send("You need to mention a role!")
				return;
			}
			if(!member) {
					msg.channel.send("You need to mention a person!")
					return;
			}
			member.roles.add(role)
			msg.channel.send(`Added Role: ${role.name} to member: ${member.nickname ? member.nickname : member.user.username}`)
		} else {
			msg.channel.send("You don't have role permissions, silly");
		}
	} else if(command == "roleRemove") {
		if(msg.member.hasPermission("MANAGE_ROLES")) {
			let role = msg.mentions.roles.first()
			let member = msg.mentions.members.first()
			if(!role) {
				msg.channel.send("You need to mention a role!")
				return;
			}
			if(!member) {
					msg.channel.send("You need to mention a person!")
					return;
			}
			member.roles.remove(role)
			msg.channel.send(`Removed Role: ${role.name} from member: ${member.nickname ? member.nickname : member.user.username}`)
		} else {
			msg.channel.send("You don't have role permissions, silly");
		}
	} else if(command == "aww") {
		randomPuppy('aww').then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
	} else if(command == "dog") {
		randomPuppy().then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
	} else if(command == "kitten") {
		randomPuppy('kitten').then(url => {
			msg.channel.send(`${randomGivers[Math.floor(Math.random() * randomGivers.length)]} ${url}`)
		})
	} else if(command == "crab") {
		let finalCrabs = ""
		let args = argumentDictionaryFromMessage("crab", msg.content, ["crabCount"])
		if(args.crabCount == null) args = NaN
		if(args.crabCount != null) args = Number(args.crabCount)
		if(isNaN(args)) {
			msg.channel.send(":crab:")
			return;
		}
		if(args > 120) {
			msg.channel.send("Sorry! The Limit is 120 crabs. (Just out of channel courtesy)")
			return;
		}
		for(let i=0;i<args;i++) {
			finalCrabs += ":crab:"
		}
		msg.channel.send(finalCrabs)
	} else if(command == "bird") {
		let finalBirds = ""
		let args = argumentDictionaryFromMessage("bird", msg.content, ["birdCount"])
		if(args.birdCount == null) args = NaN
		if(args.birdCount != null) args = Number(args.birdCount)
		if(isNaN(args)) {
			msg.channel.send(":bird:")
			return;
		}
		if(args > 120) {
			msg.channel.send("Sorry! The Limit is 120 birds. (Just out of channel courtesy)")
			return;
		}
		for(let i=0;i<args;i++) {
			finalBirds += ":bird:"
		}
		msg.channel.send(finalBirds)
	} else if(command == "snail") {
		let finalSnail = ""
		let args = argumentDictionaryFromMessage("snail", msg.content, ["snailCount"])
		if(args.snailCount == null) args = NaN
		if(args.snailCount != null) args = Number(args.snailCount)
		if(isNaN(args)) {
			msg.channel.send(":snail:")
			return;
		}
		if(args > 120) {
			msg.channel.send("Sorry! The Limit is 120 snails. (Just out of channel courtesy)")
			return;
		}
		for(let i=0;i<args;i++) {
			finalSnail += ":snail:"
		}
		msg.channel.send(finalSnail)
	} else if(command == "rero") {
		let finalR = ""
		let args = argumentDictionaryFromMessage("rero", msg.content, ["r"])
		if(args.r == null) args = NaN
		if(args.r != null) args = Number(args.r)
		if(isNaN(args)) {
			msg.channel.send("rero")
			return;
		}
		if(args > 120) {
			msg.channel.send("Sorry! The Limit is 120 rero. (Just out of channel courtesy)")
			return;
		}
		for(let i=0;i<args;i++) {
			finalR += "rero "
		}
		msg.channel.send(finalR)
	} else if(command == "microbe") {
		let finalM = ""
		let args = argumentDictionaryFromMessage("microbe", msg.content, ["m"])
		if(args.m == null) args = NaN
		if(args.m != null) args = Number(args.m)
		if(isNaN(args)) {
			msg.channel.send(":microbe:")
			return;
		}
		if(args > 120) {
			msg.channel.send("Sorry! The Limit is 120 microbes. (Just out of channel courtesy)")
			return;
		}
		for(let i=0;i<args;i++) {
			finalM += ":microbe:"
		}
		msg.channel.send(finalM)
	} else if(command == "vapor") {
		// a!vapor hello bros
		let args = argumentDictionaryFromMessage("vapor", msg.content, ["vaporString"])
		if(args.vaporString == null) args.vaporString = "You Need Some Text"
		msg.channel.send(vaporString(args.vaporString))
	} else if(command == "whatshard") {
		let shard = msg.guild.shard
		msg.channel.send(`This server is on shard \`${shard.id}\` with heartbeat ping of \`${shard.ping}ms\``)
	} else if(command == "confirm") {
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
			}
		} else {
			msg.channel.send("Looks like you're not the person who instantiated the sequence or a confirm sequence hasn't be started")
		}
	} else if(command == "ban") {
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
	} else if(command == "cancelBan") {
		isInBanConfirmation = false
		banConfirmMember = null
		sequenceStarter = null
		clearTimeout(banTimeout)
		msg.channel.send("*Ban has been cancelled*")
	} else if(command == "avatar") {
		let avatarEmbed = new Discord.MessageEmbed()
		.setColor('#14c49e')
		.setTitle(randomGivers[Math.floor(Math.random() * randomGivers.length)])
		.setImage(msg.member.user.avatarURL({ size: 512, dynamic: true }))
		.setTimestamp()
		.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
		msg.channel.send(avatarEmbed)
	} else if(command == "lofi") {
		// Args
		let args = msg.content.replace(config.prefix+"lofi", "")[0] == " " ? msg.content.replace(config.prefix+"lofi ", "").split(" ") : "invalid code".split(" ")
		// Only try to join the sender's voice channel if they are in one themselves
		if (msg.member.voice.channel) {
			connection = await msg.member.voice.channel.join();
			msg.member.voice.channel.members.each(mbr => {
				if(mbr.client == client) return;
				mbr.voice.setMute(true).catch(console.error)
			})
			sequenceStarter = msg.member
			let livePre = "WARNING: Lofi Live Streams Might Have Issues\n"
			if(args[0] && args[0].toLowerCase() == "chilledcow") {
				let randomCow = ["https://www.youtube.com/watch?v=QCvi-tBaEfA", "https://www.youtube.com/watch?v=DWcJFNfaw9c", "https://www.youtube.com/watch?v=5qap5aO4i9A", "https://www.youtube.com/watch?v=-FlxM_0S2lA", "https://www.youtube.com/watch?v=lTRiuFIWV54"]
				let cowNumber = Math.floor(Math.random()*randomCow.length)
				let cowVideo = randomCow[cowNumber]
				let liveBufferAmount = (cowNumber == 2 || cowNumber == 3) ? 3000000 : 2000
				isPlaying = true
				dispatcher = connection.play(ytdl(cowVideo, { filter: 'audioonly', liveBuffer: liveBufferAmount }));
				dispatcher.on("end", () => { connection.disconnect() })
				msg.channel.send(livePre+cowVideo)
			} else if(!args[0]) {
				msg.channel.send("You need to include one of the following lofi channels:")
				msg.channel.send("`chilledcow` `monstafluff` `wp-farm`")
				return;
			} else if(args[0] && args[0].toLowerCase() == "monstafluff") {
				isPlaying = true
				dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=pH3xU1YcjaA", {filter:'audioonly', liveBuffer: 3000000}))
				dispatcher.on("end", () => { connection.disconnect() })
				msg.channel.send(livePre+"https://www.youtube.com/watch?v=pH3xU1YcjaA")
			} else if(args[0] && args[0].toLowerCase() == "wp-farm") {
				isPlaying = true
				dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=TDcb68Ve97w', {filter:'audioonly', liveBuffer: 3000000}))
				dispatcher.on("end", () => { connection.disconnect() })
				msg.channel.send(livePre+'https://www.youtube.com/watch?v=TDcb68Ve97w')
			} else {
				msg.channel.send("You need to include one of the following lofi channels (We Recommend To Copy And Paste):")
				msg.channel.send("`chilledcow` `monstafluff` `wp-farm`")
			}
		} else {
			msg.channel.send('You need to join a voice channel first!');
		}
	} else if(command == "stopLofi") {
		if(msg.member == sequenceStarter && isPlaying) {
			connection.dispatcher.pause()
			connection.disconnect()
		}
	} else if(command == "restart") {
		let id = msg.member.user.id
		con.query('SELECT * FROM bot_admins;', (err, res, fields) => {
			let hasResults = false
			try {
				if(res[0].id != null) hasResults = true
			} catch {
				hasResults = false
			}
			if(hasResults) {
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == id) {
						msg.channel.send("Restarting Now!")
						process.exit()
					} else {
						msg.channel.send("You think you're sneaky huh? :laughing:\n You've got to be a bot owner to run this command")
					}
				}
			} else {
				msg.channel.send("Hmm... I couldn't find any admin entries in the database.")
			}
		})
	} else if(command == "toggleowner") {
		let id = msg.member.user.id
		let args = argumentDictionaryFromMessage("toggleowner", msg.content, ["userId"])
		con.query('SELECT * FROM bot_admins;', (err, res, fields) => {
			let hasResults = false
			try {
				if(res[0].id != null) hasResults = true
			} catch {
				hasResults = false
			}
			if(hasResults) {
				let isVerified = false
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == id) {
						isVerified = true
						break;
					}
				}
				let noAdminFound = true
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == args.userId) {
						noAdminFound = false
						break;
					}
				}
				if(isVerified && noAdminFound) {
					let username = null
					fetchMemberWithId(msg.guild, args.userId).then(user => {
						username = user.user.username
						con.query(`INSERT INTO bot_admins (username, userId, timestamp) VALUES (\"${username}\", \"${args.userId}\", \"${new Date().toDateString()}\")`, (err, r,f) => {
							if(err) {
								console.error(err)
								return;
							}
							msg.channel.send(":tada: Created Owner! :tada:")
						})
					})
				} else if(isVerified && !noAdminFound) {
					con.query(`DELETE FROM bot_admins WHERE userId=\"${args.userId}\"`, (e, r, f) => {
						if(e) {
							console.error(e)
							return;
						}
						msg.channel.send("Deleted Owner! :confounded:")
					})
				} else {
					msg.channel.send(":laughing: You're not a bot admin...")
				}
			}
		})
	} else if(command == "botowners") {
		let args = argumentDictionaryFromMessage("botowners", msg.content, ["queryId"])
		if(args.queryId == null) {
			con.query(`SELECT * FROM bot_admins;`, (err, res, fields) => {
				let hasResults = false
				try {
					if(res[0].id != null) hasResults = true
				} catch {
					hasResults = false
				}
				let table = new AsciiTable("Bot Owners")
					.setHeading('id', 'username (cached)', 'userId', 'coronation date')
				if(hasResults) {
					for (var i=0; i<res.length;i++) {
						table.addRow(res[i].id, res[i].username, res[i].userId, res[i].timestamp)
					}
				} else {
					table.addRow('0', 'No Users Found', 'No Users Found', 'January 1st 1970')
				}
				msg.channel.send(`\`\`\`\n${table.toString()}\`\`\``)
			})
		}
	} else if(command == "nodeList") {
		// let psOut = require('child_process').execSync('ps').toString()
		// msg.channel.send(`\`\`\`\n${psOut}\`\`\``)
		psNode.lookup({ command: 'node', arguments:'--debug' }, (err, list) => {
			if(err) {
				throw new Error(err)
			}
			let table = new AsciiTable('Current NodeJS Processes')
			table.setHeading('PID', 'COMMAND', 'ARGS')
			for(let i=0;i<list.length;i++) {
				let p = list[i]
				if(p) {
					table.addRow(process.pid, process.command, process.arguments)
				}
			}
			msg.channel.send(`\`\`\`\n${table.toString()}\`\`\``)
		})
	} else if(command == "eval") {
		let id = msg.member.user.id
		con.query('SELECT * FROM bot_admins;', (err, res, fields) => {
			let hasResults = false
			try {
				if(res[0].id != null) hasResults = true
			} catch {
				hasResults = false
			}
			if(hasResults) {
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == id) {
						try {
							let evalReturn = eval(msg.content.replace("a!eval ",""))
							msg.channel.send(`\`\`\`\n${evalReturn == null || undefined ? "null" : evalReturn}\`\`\``)
							msg.channel.send(`Type:\n\`\`\`${typeof evalReturn}\`\`\``)
							return;
						} catch(e) {
							msg.channel.send(`\`\`\`${e}\`\`\``)
							return;
						}
					}
				}
				msg.channel.send("You think you're sneaky huh? :laughing:\n You've got to be a bot owner to run this command")
			} else {
				msg.channel.send("Hmm... I couldn't find any admin entries in the database.")
			}
		})
	} else if(command == "prefix"){
		// TODO: Finish this
		// prefixAlterModeId = msg.guild.id
		// isInPrefixAlterMode = true
		// msg.channel.send("Alter Mode Active: Set a bot prefix")
	} else if(command == "nitro") {
		let args = argumentDictionaryFromMessage("nitro", msg.content, ["emojiName", "emojiCount", "source"])
		if(args.emojiCount == null) args.emojiCount = NaN
		if(args.emojiCount != null) args.emojiCount = Number(args.emojiCount)
		if(args.source == null) args.source = "main"
		if(args.source != null) args.source = args.source.toLowerCase()
		if(args.source != null) hasSource = true
		if(hasSource && (args.source != "alt" || args.source != "main")) args.source = "main"
		let ownerGuild = client.guilds.cache.array()
		ownerGuild = ownerGuild.filter(g => g.id == "554758758090145801")
		ownerGuild = ownerGuild[0]
		let ownerEmoji = ownerGuild.emojis.cache.array()
		ownerEmoji = ownerEmoji.filter(e => e.name == args.emojiName)
		if(ownerEmoji[0] == null) {
			msg.channel.send("Emoji does not exist in owner database")
			return
		}
		if(args.emojiCount > 120) {
			msg.channel.send("Sorry! The Limit is 120 emoji. (Just out of channel courtesy)")
			return
		}
		if(isNaN(args.emojiCount)) {
			msg.channel.send(ownerEmoji)
			return
		}
		let finalEmoji = ""
		for(let i=0;i<args.emojiCount;i++) {
			finalEmoji += ownerEmoji[0].animated ? `<a:${ownerEmoji[0].name}:${ownerEmoji[0].id}>` : `<:${ownerEmoji[0].name}:${ownerEmoji[0].id}>`
		}
		if(finalEmoji.length > 2000) {
			msg.channel.send("Discord Character Limits Do Not Allow Over 2000 Characters. Sorry about this.")
			return
		}
		msg.channel.send(finalEmoji)
	} else if(command == "listnitro") {
		let ownerGuild = client.guilds.cache.array()
		ownerGuild = ownerGuild.filter(g => g.id == "554758758090145801")
		ownerGuild = ownerGuild[0]
		let ownerEmoji = ownerGuild.emojis.cache.array()
		let table = new AsciiTable('Emoji List')
		table.setHeading('NAME')
		for(let e of ownerEmoji){
			table.addRow(e.name)
		}
		msg.channel.send(`\`\`\`\n${table.toString()}\`\`\``)
	} else if(command == "uwuify") {
		let args = argumentDictionaryFromMessage("uwuify", msg.content, ["uwutext"])
		if(args.uwutext == null) args.uwutext = "You need to have something to say. >w<"
		let uwu = args.uwutext
		uwu = uwu.replace(/(?:l|r)/g, 'w')
		uwu = uwu.replace(/(?:L|R)/g, 'w')
		uwu = uwu.replace("no", "nyo")
		uwu = uwu.replace("mo", "myo")
		uwu = uwu.replace("s", "sh")
		uwu = uwu.replace(/!+/g, `  >w< `)
		let f = Math.random() > 0.25
		if(f) {
			let c = uwu.charAt(0)
			uwu = c + '-' + uwu
		}
		msg.channel.send(uwu.toLowerCase() + " uwu!")
	} else if(command == "announce") {
		let id = msg.member.user.id
		let args = argumentDictionaryFromMessage("announce", msg.content, ["announcement"])
		con.query('SELECT * FROM bot_admins;', (err, res, fields) => {
			let hasResults = false
			try {
				if(res[0].id != null) hasResults = true
			} catch {
				hasResults = false
			}
			if(hasResults) {
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == id) {
						let guildArr = client.guilds.cache.array()
						for(let guild of guildArr) {
							let defChan = getDefaultChannel(guild)
							defChan.send(args.announcement)
						}
						return
					}
				}
				msg.channel.send("You think you're sneaky huh? :laughing:\n You've got to be a bot owner to run this command")
			} else {
				msg.channel.send("Hmm... I couldn't find any admin entries in the database.")
			}
		})
	} else if(command == "simpsons") {
		msg.channel.send("|| https://i.redd.it/o78c472xnzw41.jpg || <= Cursed Simpons")
	} else if(command == "version") {
		msg.channel.send(`Ava Version: ${versionString} ${channelName}`)
	} else if(command == "changelog") {
		let changelog = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Changelog')
			.attachFiles(['./AvaIcon.png'])
			.setAuthor(`Ava ${versionString} ${channelName}`, 'attachment://AvaIcon.png')
			//.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ size: "128", dynamic: true, format: "png" }))
			.setDescription(`Current Ava Version: ${versionString}`)
			.addFields(
				{ name: `v1.0.0 ${channelName}`, value: 'First Release!' },
				{ name: `v1.1.0 ${channelName}`, value: 'Added New Commands!' },
				{ name: `v1.3.0 ${channelName}`, value: '[Pretty Big Update](https://google.com/search?q=site+work+in+progress+check+back+later)' },
				{ name: `v1.4.0 ${channelName}`, value: 'Added uwuify Command. Added informal changelog' },
				{ name: `v1.4.3 ${channelName}`, value: 'Changed how the starboard functioned' },
				{ name: `v1.4.6 ${channelName}`, value: 'Added advanced image/gif support for starboard' },
				{ name: `v1.5.0 ${channelName}`, value: 'Upgraded to embed changelog.' },
				{ name: `v1.6.0 ${channelName}`, value: 'Bug fixes. Like alot!' },
				{ name: `v1.7.0 ${channelName}`, value: 'In a new server!' },
				{ name: `v1.7.9 ${channelName}`, value: 'Even more bug fixes.' },
				{ name: `v1.8.0 ${channelName}`, value: 'Added the \"hall-of-sin\" for a custom server!' },
				{ name: `v1.9.0 ${channelName}`, value: 'Fixed the starboard image/gif support.' }
			)
			.setThumbnail('attachment://AvaIcon.png')
			.setTimestamp()
			.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
		msg.channel.send(changelog)
	} else if(command == "serverinfo") {
		let info = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Server Info')
			.setAuthor(`NodeJS ${require('child_process').execSync('node -v').toString()}`, 'https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
			.setDescription(`Current [NodeJS](https://nodejs.org): ${require('child_process').execSync('node -v').toString()}`)
			.addFields(
				{ name: 'Server CPU', value: `${require('child_process').execSync('sysctl -n machdep.cpu.brand_string').toString()}` }
			)
			.setThumbnail('https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
			.setTimestamp()
			.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], 'https://cdn2.iconfinder.com/data/icons/nodejs-1/128/nodejs-128.png')
		msg.channel.send(info)
	}
});

client.login(config.token)
