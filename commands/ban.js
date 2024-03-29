module.exports = {
  name: 'ban',
  description: 'Ban a mentioned user. No other arguments',
  type: 'Moderation',
  permissionsLevel: 'Server Moderator',
  example: '@User',
  execute(client, msg, args) {
    let members = msg.mentions.members.array()
    for(let member of members) {
	    if(!member) return msg.channel.send(`You didn't mention a user to ban!`)
		if(member.user === client.user) {
			msg.channel.send("I can\'t ban myself, silly!")
			return;
		}
		if(msg.member.hasPermission("BAN_MEMBERS")) {
			member.ban({ reason: `Banned from Ava. Confirmed by ${msg.member.user.tag}` }).catch(err => {
				if(err.message == "Missing Permissions" && err.httpStatus == 403 && err.code == 50013) {
					msg.channel.send("It seems that I have insufficient permissions.")
					msg.channel.send("Please ensure that my user specific role is on the top of the role hierarchy")
				} else {
					console.log(err)
					msg.channel.send("Some error occured. Couldn't ban user")
				}
			}).then(() => {
				msg.channel.send("Ban Confirmed. User Banned...")
			})
		} else {
			msg.channel.send("*Insufficient Permissions*")
		}
    }
  }
}
