module.exports = {
  name: 'invite',
  description: 'Get an Invite Code For Ava',
  execute(client, msg, args) {
    client.generateInvite(["ADMINISTRATOR"]).then(l => {
			msg.channel.send(`Invite Link For Ava:\n${l}`)
		})
  }
}
