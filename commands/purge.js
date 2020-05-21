module.exports = {
  name: 'purge',
  description: 'Purge messages in bulk!',
  execute(client, msg, args) {
    if(args[0] == null) return
		if(isNaN(Number(args[0]))) return
		msg.delete().then(msg => {
			msg.channel.bulkDelete(args[0]).then(msgs => {
				let msg = msgs.first()
				msg.channel.send(`I\'ve cleared \`${args[0]} ${args[0] == 1 ? "message" : "messages"}\` for you!`).then(msg => {
					setTimeout(msg => {
						msg.delete()
					}, 4000, msg)
				})
			})
		})
  }
}
