const Discord = require('discord.js')
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
const { handlePrefixAlter, handlePrefixFinish } = require('./handlers/prefix.js')
const mysql = require('mysql')
let dispatcher = null
let isPlaying = false
let isInAlterMode = false
let isInPrefixAlterMode = false
let prefixAlterModeId = null
let connection = null
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
	fetch('https://maker.ifttt.com/trigger/ava_start/with/key/fv1KMm9l07e3vmqr183BeJ7t_c7rPLwDtQqR4gK-9Db')
	console.log('Ready!')
	client.user.setPresence({
		activity: {
			name: 'with my cat',
			type: 'STREAMING',
			url: "https://www.youtube.com/watch?v=iHEuM1e8V40"
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
		console.log(reaction.emoji.name)
		if(reaction.emoji.name == '\u{2B50}' || reaction.emoji.name == "\u{2b}") {
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

client.on('message', async msg => {
	let noPrefix = msg.content.replace(config.prefix, "")
	let command = noPrefix.split(" ")[0]
	if(isInPrefixAlterMode && sequenceStarter != null && sequenceStarter == msg.member && prefixAlterModeId != null) {
		handlePrefixAlter(msg, alterModeId)
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
	} else if(command == "pm2List") {
		msg.channel.send(`\`\`\`\n${require('child_process').execSync('pm2 list').toString()}\`\`\``)
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
	}
});

client.login(config.token)
