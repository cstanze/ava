module.exports = {
  name: 'aight',
  description: 'are you feelin aight?',
  execute(client, msg, args) {
    const filter = (reaction, user) => {
			return reaction.emoji.name == '👌'
		};
		msg.channel.send("👌 if you\'re feelin **aight**").then(mxg => {
			mxg.react('👌')
			const collector = mxg.createReactionCollector(filter, { time: 30000 })
			collector.on('collect', (reaction, user) => {
				if(user.id == "702896046480818218") return
				msg.channel.send(`${user.username} is feelin **aight**`)
			})
			collector.on('end', collected => {
				if(collected.size > 1) {
					msg.channel.send(`${collected.size} people are feelin **aight**`)
					return
				}
				msg.channel.send(`${collected.size} person is feelin **aight**`)
			})
		})
  }
}
