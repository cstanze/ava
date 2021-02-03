module.exports = {
	name: 'user_perm_level',
	description: `Get a User's permission level.`,
	aliases: ['upl', 'uperms'],
	usage: '@User',
	args: true,
	async execute(client, msg, _args) {
		const targets = msg.mentions.members.array()
		if(!targets.length) return msg.channel.send(`You must mention a server member to check their permission level.`)

		for(const target of targets) {
			msg = {
				...msg,
				member: target,
				author: target.user,
				client,
				guild: msg.guild
			}
			let level

			console.log(`Has Guild? ${typeof msg.guild != 'undefined'}`)
			console.log(`Has Client? ${typeof msg.client != 'undefined'}`)
			console.log(`Has Member? ${typeof msg.member != 'undefined'}`)
			console.log(`Has Author? ${typeof msg.author != 'undefined'}`)
			console.log(`Author ID: ${typeof msg.author != 'undefined' ? msg.author.id : `(null)`}`)
			
			try {
				level = client.permLevel(msg)
			} catch(e) {
				if(process.env.DEBUG)
					console.log(e)
				msg.channel.send(`There was an issue getting ${target.displayName}'s permission level.`)
				continue
			}

			msg.channel.send(`${target.displayName}'s permission level is ${level} (${client.config.permLevels.find(l => l.level == level).name})`)
		}
	}
}